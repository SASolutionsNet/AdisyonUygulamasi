// sales.accounting.detail.component.ts
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../../../shared/modules/sales/order/services/order.service';
import { SalesAccountingService } from '../../../shared/modules/sales/accounting/services/accounting.service';
import { SalesAccounting } from '../../../shared/modules/sales/accounting/models/accounting.model';
import { DialogPaidAlertComponent } from '../../../shared/modules/dialogpaidalert/dialogpaidalert.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SignalRService } from '../../../services/signalr.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from '../../../header/header.component';
import { AccountingDetailComponent } from '../../../shared/modules/sales/accounting/components/detail/accounting.detail.component';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

export interface Order {
  id: string;
  table: string;
  productName: string;
  cost: number;
  paid: boolean;
  quantity: number;
  productId: string;
}

@Component({
  selector: 'app-sales-accounting-detail',
  templateUrl: './sales.accounting.detail.component.html',
  styleUrls: ['./sales.accounting.detail.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatTabsModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule,
    MatIconModule, AccountingDetailComponent, MatCardModule, HeaderComponent, SidebarComponent, MatDialogModule]  // Standalone bileşenler
})
export class SalesAccountingDetailComponent implements OnInit, OnDestroy {
  bill: SalesAccounting = new SalesAccounting();
  orderCreate: any[] = [];
  orders: Order[] = [];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);
  box: string = '';
  paidRows: Order[] = [];
  sumPaidOrdersCost: number = 0;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private orderService: SalesOrderService,
    private accountingService: SalesAccountingService,
    private dialog: MatDialog,
    private signalRService: SignalRService // SignalR servisi eklendi
  ) { }

  ngOnInit() {
    // URL’den masanın bilgisini alıyoruz
    this.route.paramMap.subscribe(params => {
      const boxParam = params.get('box');
      this.box = boxParam !== null ? boxParam : '';
      this.loadOrdersFromLocalStorage();

      // SignalR bağlantısını başlat ve bu masaya ait gruba katıl
      this.signalRService.startConnection(this.box);

      // Gelen sipariş güncellemelerini dinle (örneğin toplam tutar güncellemesi)
      this.signalRService.orderUpdateReceived().subscribe(({ table, totalCost }) => {
        if (table === this.box) {
          console.log('Güncel toplam tutar:', totalCost);
          // Burada UI’da toplam tutar gibi bilgileri güncelleyebilirsiniz.
          // Örneğin: this.bill.totalPrice = totalCost;
          this.bill.totalPrice = totalCost;
          this.cdRef.detectChanges();
        }
      });

      // Gelen masa kapanma sinyalini dinle
      this.signalRService.tableClosedReceived().subscribe((table) => {
        if (table === this.box) {
          console.log(`Masa ${table} kapatıldı.`);
          // Masa kapatıldıktan sonra yapılacak ek işlemler
          this.router.navigate(['/sales/accounting/list']);
        }
      });
    });
  }

  ngOnDestroy() {
    // Bileşen yok olurken SignalR bağlantısını sonlandır
    this.signalRService.stopConnection();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  // LocalStorage'dan orders verisini alıp filtreliyoruz
  loadOrdersFromLocalStorage() {
    const orders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
    const filteredOrders = orders.filter(order => order.table === this.box);
    this.orders = filteredOrders;
    this.dataSource.data = this.orders;
  }

  calculatePaidOrdersSumCost(): number {
    this.sumPaidOrdersCost = this.paidRows.reduce((total, order) => {
      return total + (order.cost * order.quantity);
    }, 0);
    return this.sumPaidOrdersCost;
  }

  saveOrdersToLocalStorage() {
    localStorage.setItem('salesAccountingOrders', JSON.stringify(this.orders));
  }

  closeTable(): void {
    const tableParam = this.route.snapshot.paramMap.get('box');
    if (tableParam) {
      let savedOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
      let paidOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
      savedOrders = savedOrders.filter(order => order.table === tableParam);
      paidOrders = paidOrders.filter(order => order.table === tableParam);
      var flag = (paidOrders.length !== savedOrders.length);

      if (flag) {
        let dialog: MatDialogRef<DialogPaidAlertComponent> = this.dialog.open(DialogPaidAlertComponent, { width: '500px', data: { name: 'DialogPaidAlertComponent input data' } });
        dialog.afterClosed().subscribe(result => {
          console.log('Dialog sonucu: ', result);
          if (result && result.answer === 'yes') {
            let otherSavedOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
            let otherPaidOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
            otherSavedOrders = otherSavedOrders.filter(order => order.table !== tableParam);
            otherPaidOrders = otherPaidOrders.filter(order => order.table !== tableParam);
            this.paidRows = paidOrders;

            this.bill.table = tableParam;
            this.bill.totalPrice = this.calculatePaidOrdersSumCost();

            this.accountingService.createBill(this.bill).subscribe(response => {
              for (let i = 0; i < paidOrders.length; i++) {
                var model = {
                  billId: response.id,
                  productId: paidOrders[i].productId,
                  quantity: paidOrders[i].quantity
                };
                this.orderCreate.push(model);
              }
              this.orderService.addOrders(this.orderCreate).subscribe(resp => {
                console.log('Siparişler oluşturuldu:', resp);
              }, error => {
                console.error('Sipariş oluşturma hatası:', error);
              });
            }, error => {
              console.error('Fatura oluşturma hatası:', error);
            });

            localStorage.setItem('salesAccountingOrders', JSON.stringify(otherSavedOrders));
            localStorage.setItem('paidOrders', JSON.stringify(otherPaidOrders));

            // SignalR üzerinden masa kapanma sinyali gönderelim
            this.signalRService.closeTableSignal(tableParam);
          }
        });
      }
    } else {
      console.log("Table parametresi bulunamadı.");
    }
  }

  printOrders(): void {
    let orderList: any; // Uygun veriyi burada tanımlayın
    this.orderService.addOrders(orderList).subscribe(response => {
      console.log('Siparişler yazdırıldı:', response);
    }, error => {
      console.error('Yazdırma hatası:', error);
    });
  }

  payAllOrders(): void {
    // Gerekli ödeme işlemleri burada tanımlanabilir
  }
}
