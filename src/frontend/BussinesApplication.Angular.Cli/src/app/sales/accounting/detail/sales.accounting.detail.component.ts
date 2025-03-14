import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountingDetailComponent } from '../../../shared/modules/sales/accounting/components/detail/accounting.detail.component';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../../../shared/modules/sales/order/services/order.service';
import { SalesAccountingService } from '../../../shared/modules/sales/accounting/services/accounting.service';
import { SalesAccounting } from '../../../shared/modules/sales/accounting/models/accounting.model';

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
  imports: [AccountingDetailComponent, MatCardModule, HeaderComponent, SidebarComponent]  // Standalone bileşenler
})


export class SalesAccountingDetailComponent implements OnInit {
  bill: SalesAccounting = new SalesAccounting();

  orderCreate: any[] = [];

  orders: Order[] = [];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);
  box: string = '';
  paidRows: Order[] = [];  // Ödenen satırları saklayacağız
  sumPaidOrdersCost: number = 0; // Başlangıçta toplam tutar 0
  constructor(private router: Router, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private orderService: SalesOrderService, private accountingService: SalesAccountingService) { }

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
    console.log("masa kapandı1");

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

      let otherSavedOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
      let otherPaidOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
      otherSavedOrders = otherSavedOrders.filter(order => order.table != tableParam);
      otherPaidOrders = otherPaidOrders.filter(order => order.table != tableParam);

      this.paidRows = paidOrders;

      this.bill.table = tableParam;
      this.bill.totalPrice = this.calculatePaidOrdersSumCost();

      this.accountingService.createBill(this.bill).subscribe(response => {

        for (var i = 0; i < paidOrders.length; i++) {
          var model = {
            billId: response.id,
            productId: paidOrders[i].productId,
            quantity: paidOrders[i].quantity
          }
          this.orderCreate.push(model);
        }

        // OrderService'den addOrders fonksiyonunu çağırma *********
        this.orderService.addOrders(this.orderCreate).subscribe(response => {
          console.log('Siparişler başarıyla oluşturuldu:', response);
        }, error => {
          console.error('Sipariş oluşturma hatası:', error);
        });


      }, error => {
        console.error('Bill oluşturma hatası:', error);
      });


      // Yeni listeyi tekrar localStorage'a kaydet
      localStorage.setItem('salesAccountingOrders', JSON.stringify(otherSavedOrders));
      // Yeni listeyi tekrar localStorage'a kaydet
      localStorage.setItem('paidOrders', JSON.stringify(otherPaidOrders));

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
