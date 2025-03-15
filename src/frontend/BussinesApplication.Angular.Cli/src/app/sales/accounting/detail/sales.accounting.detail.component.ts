import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AccountingDetailComponent } from '../../../shared/modules/sales/accounting/components/detail/accounting.detail.component';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../../../shared/modules/sales/order/services/order.service';
import { DialogPaidAlertComponent } from '../../../shared/modules/dialogpaidalert/dialogpaidalert.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';

export interface Order {
  id: string;
  table: string;
  productName: string;
  cost: number;
  paid: boolean;  // Satırların ödeme durumu
  quantity: number;
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

  orders: Order[] = [];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);
  box: string = '';


  constructor(private router: Router, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private orderService: SalesOrderService,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const boxParam = params.get('box');
      this.box = boxParam !== null ? boxParam : '';  // Eğer null ise boş bir string atıyoruz
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
    const orders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
    // 'box' parametresine göre filtreleme yapıyoruz
    const filteredOrders = orders.filter(order => order.table === this.box);
    this.orders = filteredOrders;  // Filtrelenmiş veriyi 'orders' array'ine atıyoruz
    this.dataSource.data = this.orders;  // DataSource'u güncelliyoruz
  }

  // LocalStorage'a "orders" verisini kaydediyoruz
  saveOrdersToLocalStorage() {
    localStorage.setItem('salesAccountingOrders', JSON.stringify(this.orders));
  }
  closeTable(): void {


    // Popup bileşenine id parametresini gönderiyoruz
    this.dialog.open(DialogPaidAlertComponent, {
      width: '1000px'
    });






    console.log("masa kapandı1");

    // ActivatedRoute'den table parametresini al
    const tableParam = this.route.snapshot.paramMap.get('box');  // 'table' URL parametresinin adı olmalı

    if (tableParam) {
      // localStorage'dan salesAccountingOrders verisini al
      let savedOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
      // localStorage'dan salesAccountingOrders verisini al
      let paidOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');

      // 'table' parametresi ile eşleşen kayıtları filtrele ve çıkar
      savedOrders = savedOrders.filter(order => order.table !== tableParam);
      // 'table' parametresi ile eşleşen kayıtları filtrele ve çıkar
      paidOrders = paidOrders.filter(order => order.table !== tableParam);

      // OrderService'den addOrders fonksiyonunu çağırma *********
      this.orderService.addOrders(savedOrders).subscribe(response => {
        console.log('Siparişler başarıyla oluşturuldu:', response);
      }, error => {
        console.error('Sipariş oluşturma hatası:', error);
      });


      // Yeni listeyi tekrar localStorage'a kaydet
      localStorage.setItem('salesAccountingOrders', JSON.stringify(savedOrders));
      // Yeni listeyi tekrar localStorage'a kaydet
      localStorage.setItem('paidOrders', JSON.stringify(paidOrders));

      // Kayıt silindi, konsola yaz
      console.log(`Table ${tableParam} ile eşleşen kayıtlar silindi.`);

      this.router.navigate(['/sales/accounting/list']);
    } else {
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
