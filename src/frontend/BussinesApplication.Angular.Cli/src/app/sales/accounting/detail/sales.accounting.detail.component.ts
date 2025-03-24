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
import { firstValueFrom } from 'rxjs';
import { SignalrService } from '../../../shared/modules/sales/order/services/signalr.service';


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
  paidRows: Orders[] = [];  // Ödenen satırları saklayacağız
  sumPaidOrdersCost: number = 0; // Başlangıçta toplam tutar 0
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private orderService: SalesOrderService,
    private accountingService: SalesAccountingService,
    private dialog: MatDialog,
    private signalRService: SignalrService,
  ) { }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const boxParam = params.get('box');
      const billParam = params.get('billId');
      this.box = boxParam !== null ? boxParam : '';
      this.billId = billParam !== null ? billParam : '';
      this.loadOrders();
    });

    this.signalRService.startConnection();
    this.signalRService.addOrderListener(() => {
      console.log("Sipraiş güncellemsi oldu.");
      this.loadOrders();
      this.calculatePaidOrdersSumCost();
    });
  }

  ngOnChanges() {
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadOrders() {
    this.orderService.getOrdersWithBillAndProduct(this.billId).subscribe((response: Orders[]) => {
      // LocalStorage'dan ödenmiş siparişleri al
      const savedPaidOrders: Orders[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');

      // Verileri parçalarken unique ID'ler oluştur
      const processedOrders = response.flatMap(originalOrder =>
        Array(originalOrder.quantity).fill(null).map((_, index) => {
          // Her bir parçalanmış item için unique ID
          const uniqueId = `${originalOrder.id}-${index}`;

          // Bu item'ın ödenip ödenmediğini kontrol et
          const isPaid = savedPaidOrders.some(paidOrder =>
            paidOrder.uniqueId === uniqueId &&
            paidOrder.table === this.box
          );

          return {
            ...originalOrder,
            uniqueId: uniqueId, // Yeni unique ID
            id: originalOrder.id, // Orijinal ID'yi koru
            paid: isPaid,
            quantity: 1,
          };
        })
      );

      this.orders = processedOrders;
      this.dataSource.data = processedOrders;

      if (this.orders.length === 0) {
        this.router.navigate(['/sales/accounting/list']).then(() => {
          window.location.reload();
        });
      }
      this.calculatePaidOrdersSumCost();
    });
  }

  calculatePaidOrdersSumCost(): number {
    this.sumPaidOrdersCost = this.paidRows.reduce((total, order) => {
      return total + (order.price * order.quantity);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);

    return this.sumPaidOrdersCost;
  }

  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8); // v için 8, 9, a, b sayılarından biri seçilir
      return v.toString(16);
    });
  }

  async closeTable() {

    // ActivatedRoute'den table parametresini al
    const tableParam = this.route.snapshot.paramMap.get('box');  // 'table' URL parametresinin adı olmalı


    if (tableParam) {

      let savedOrders = this.orders;

      let paidOrders: Orders[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
      let otherPaidOrders = paidOrders.filter(order => order.table != tableParam);
      paidOrders = paidOrders.filter(order => order.table == tableParam);
      this.paidRows = paidOrders;


      this.bill.id = this.billId;
      this.bill.table = tableParam;
      this.bill.totalPrice = this.calculatePaidOrdersSumCost();
      this.bill.isClosed = true;

      console.log("paidOrders")
      console.log(paidOrders)

      // 'table' parametresi ile eşleşen kayıtları filtrele ve çıkar
      var flag = (paidOrders.length != savedOrders.length) // hala ödenmemiş hesap varsa true

      if (flag) {
        let dialog: MatDialogRef<DialogPaidAlertComponent> = this.dialog.open(DialogPaidAlertComponent, { width: '500px', data: { name: 'DialogPaidAlertComponent input data' } });
        /*dialog.componentInstance.setContent("Emin misiniz?", "Kayıt silinecek onaylıyor musunuz ?", "Evet, Sil", "Hayır");*/

        dialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed, result: ', result);
          if (result) {
            if (result.answer == 'yes') {

              //nonPaidOrders
              this.nonPaidOrders = Object.values(
                savedOrders.reduce((acc, order) => {
                  const existing = acc[order.productId] || { ...order, quantity: 0 };
                  existing.quantity += 1; // Her siparişin miktarı 1 olduğu için sayacı artır

                  acc[order.productId] = existing;
                  return acc;
                }, {} as Record<string, any>)
              ).map(order => {
                const paidCount = paidOrders.filter(paid => paid.productId === order.productId).length;
                const remainingQuantity = order.quantity - paidCount;

                return remainingQuantity > 0 ? order.productId : null;
              }).filter(productId => productId !== null); // Sadece kalan miktarı olanları tut


              console.log("nonPaidOrders")
              console.log(this.nonPaidOrders)
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

              localStorage.setItem('paidOrders', JSON.stringify(otherPaidOrders));
              console.log(`Table ${tableParam} ile eşleşen kayıtlar silindi.`);
              this.router.navigate(['/sales/accounting/list']);

            }
          }
        });
      }
      else {
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
