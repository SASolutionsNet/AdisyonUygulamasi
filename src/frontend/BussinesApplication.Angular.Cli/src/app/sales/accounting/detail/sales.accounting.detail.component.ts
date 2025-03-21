import { ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AccountingDetailComponent } from '../../../shared/modules/sales/accounting/components/detail/accounting.detail.component';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../../../shared/modules/sales/order/services/order.service';
import { SalesAccountingService } from '../../../shared/modules/sales/accounting/services/accounting.service';
import { SalesAccounting } from '../../../shared/modules/sales/accounting/models/accounting.model';
import { DialogPaidAlertComponent } from '../../../shared/modules/dialogpaidalert/dialogpaidalert.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { Orders } from '../../../shared/modules/sales/order/models/order.model';

export interface Order {
  id: string;
  table: string;
  productName: string;
  cost: number;
  paid: boolean;  // Satırların ödeme durumu
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


export class SalesAccountingDetailComponent implements OnInit {
  bill: SalesAccounting = new SalesAccounting();
  orderCreate: any[] = [];
  nonPaidOrders: any[] = [];
  orders: Orders[] = [];
  dataSource: MatTableDataSource<Orders> = new MatTableDataSource(this.orders);
  box: string = '';
  billId: string = '';
  paidRows: Order[] = [];  // Ödenen satırları saklayacağız
  sumPaidOrdersCost: number = 0; // Başlangıçta toplam tutar 0
  constructor(private router: Router, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private orderService: SalesOrderService, private accountingService: SalesAccountingService, private dialog: MatDialog) { }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const boxParam = params.get('box');
      const billParam = params.get('billId');
      this.box = boxParam !== null ? boxParam : '';  // Eğer null ise boş bir string atıyoruz
      this.billId = billParam !== null ? billParam : '';  // Eğer null ise boş bir string atıyoruz
      this.loadOrdersFromLocalStorage();  // Sayfaya her döndüğünde veriyi yükle


    });

  }

  ngOnChanges() {
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  // LocalStorage'dan "orders" verisini alıyoruz ve box'a göre filtreliyoruz
  loadOrdersFromLocalStorage() {
    var orders: Orders[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
    console.log("billId")
    console.log(this.billId)
    if (orders.filter(item => item.table == this.box).length == 0) {
      this.orderService.getAllOrdersForBill(this.billId).subscribe((data: Orders[]) => {
        if (Array.isArray(data)) {
          if (orders.length == 0) {
            orders = data;
            localStorage.setItem('salesAccountingOrders', JSON.stringify(orders));
          }
          else {
            orders.push(...(data));
            localStorage.setItem('salesAccountingOrders', JSON.stringify(orders));
          }
        }
      });
    }

    // 'box' parametresine göre filtreleme yapıyoruz
    const filteredOrders = orders.filter(order => order.table === this.box);
    this.orders = filteredOrders;  // Filtrelenmiş veriyi 'orders' array'ine atıyoruz
    this.dataSource.data = this.orders;  // DataSource'u güncelliyoruz
  }

  calculatePaidOrdersSumCost(): number {
    this.sumPaidOrdersCost = this.paidRows.reduce((total, order) => {
      return total + (order.cost * order.quantity);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);

    return this.sumPaidOrdersCost;
  }

  // LocalStorage'a "orders" verisini kaydediyoruz
  saveOrdersToLocalStorage() {
    localStorage.setItem('salesAccountingOrders', JSON.stringify(this.orders));
  }

  closeTable(): void {

    // ActivatedRoute'den table parametresini al
    const tableParam = this.route.snapshot.paramMap.get('box');  // 'table' URL parametresinin adı olmalı

    if (tableParam) {
      // localStorage'dan salesAccountingOrders verisini al
      let savedOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
      // localStorage'dan salesAccountingOrders verisini al
      let paidOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
      // 'table' parametresi ile eşleşen kayıtları filtrele ve çıkar
      savedOrders = savedOrders.filter(order => order.table == tableParam);
      // 'table' parametresi ile eşleşen kayıtları filtrele ve çıkar
      paidOrders = paidOrders.filter(order => order.table == tableParam);

      var flag = (paidOrders.length != savedOrders.length) // hala ödenmemiş hesap varsa true

      if (flag) {
        let dialog: MatDialogRef<DialogPaidAlertComponent> = this.dialog.open(DialogPaidAlertComponent, { width: '500px', data: { name: 'DialogPaidAlertComponent input data' } });
        /*dialog.componentInstance.setContent("Emin misiniz?", "Kayıt silinecek onaylıyor musunuz ?", "Evet, Sil", "Hayır");*/

        dialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed, result: ', result);
          if (result) {
            if (result.answer == 'yes') {
              let otherSavedOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
              let otherPaidOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
              otherSavedOrders = otherSavedOrders.filter(order => order.table != tableParam);
              otherPaidOrders = otherPaidOrders.filter(order => order.table != tableParam);
              this.paidRows = paidOrders;

              this.bill.id = this.billId;
              this.bill.table = tableParam;
              this.bill.totalPrice = this.calculatePaidOrdersSumCost();
              this.bill.isClosed = true;

              //nonPaidOrders
              this.nonPaidOrders = [...new Set(savedOrders
                .filter(savedOrder => !paidOrders.some(paidOrder => paidOrder.id === savedOrder.id))  // paidOrders içinde olmayanlar
                .map(order => order.productId))]; // Sadece product id'leri alıyoruz


              console.log('Non-Paid Orders:', this.nonPaidOrders);

              this.orderService.delete_range(this.billId, this.nonPaidOrders).subscribe(
                (response) => {
                  console.log('Non-Paid Orders başarıyla silindi:', response);

                },
                (error) => {
                  console.error('Non-Paid Orders silinirken bir hata oluştu:', error);

                }
              );

              this.accountingService.updateBill(this.bill).subscribe(
                (response) => {
                  // Güncelleme başarılı olduğunda yapılacak işlemler
                  console.log('Fatura başarıyla güncellendi:', response);
                },
                (error) => {
                  // Güncelleme hatası durumunda yapılacak işlemler
                  console.error('Fatura güncellenirken bir hata oluştu:', error);
                }
              );

              // Yeni listeyi tekrar localStorage'a kaydet
              localStorage.setItem('salesAccountingOrders', JSON.stringify(otherSavedOrders));
              // Yeni listeyi tekrar localStorage'a kaydet
              localStorage.setItem('paidOrders', JSON.stringify(otherPaidOrders));

              // Kayıt silindi, konsola yaz
              console.log(`Table ${tableParam} ile eşleşen kayıtlar silindi.`);
              this.router.navigate(['/sales/accounting/list']);

            }
          }
          else {

          }
        });
      }
      else {
        paidOrders = paidOrders.filter(order => order.table == tableParam);

        this.bill.id = this.billId;
        this.bill.table = tableParam;
        this.bill.totalPrice = this.calculatePaidOrdersSumCost();
        this.bill.isClosed = true;

        this.accountingService.updateBill(this.bill).subscribe(
          (response) => {
            // Güncelleme başarılı olduğunda yapılacak işlemler
            console.log('Fatura başarıyla güncellendi:', response);
          },
          (error) => {
            // Güncelleme hatası durumunda yapılacak işlemler
            console.error('Fatura güncellenirken bir hata oluştu:', error);
          }
        );

        let otherSavedOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
        let otherPaidOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
        otherSavedOrders = otherSavedOrders.filter(order => order.table != tableParam);
        otherPaidOrders = otherPaidOrders.filter(order => order.table != tableParam);


        // Yeni listeyi tekrar localStorage'a kaydet
        localStorage.setItem('salesAccountingOrders', JSON.stringify(otherSavedOrders));
        // Yeni listeyi tekrar localStorage'a kaydet
        localStorage.setItem('paidOrders', JSON.stringify(otherPaidOrders));
        this.router.navigate(['/sales/accounting/list']);

      }
    }
    else {
      console.log("Table parametresi bulunamadı.");
    }
  }
  printOrders(): void {
    let orderList: any;
    // OrderService'den addOrders fonksiyonunu çağırma *********
    this.orderService.addOrders(orderList).subscribe(response => {
      console.log('Siparişler başarıyla yazdırıldı:', response);
    }, error => {
      console.error('Sipariş yazdırma hatası:', error);
    });
    console.log("yazdır1");
  }
  payAllOrders(): void {



  }
}
