import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountingDetailComponent } from '../../../shared/modules/sales/accounting/components/detail/accounting.detail.component';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';
import { ActivatedRoute } from '@angular/router';

interface Order {
  table: string;
  position: number;
  name: string;
  category: string;
  cost: number;
}

@Component({
  selector: 'app-sales-accounting-detail',
  templateUrl: './sales.accounting.detail.component.html',
  styleUrls: ['./sales.accounting.detail.component.scss'],
  standalone: true,
  imports: [AccountingDetailComponent, MatCardModule, HeaderComponent, SidebarComponent]  // Standalone bileşenler
})
export class SalesAccountingDetailComponent implements OnInit {

  orders: Order[] = [];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);
  box: string = '';


  constructor(private cdRef: ChangeDetectorRef, private route: ActivatedRoute) { }

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
  // Yeni veriyi set etmek için kullanılan metod
  setData(tileNumber: number): void {
    const newItem: Order = {
      table: this.box,  // box parametresini doğru şekilde ekliyoruz
      position: this.getNextPosition(), // Yeni pozisyon
      name: `${tileNumber}`, // Item adı
      category: 'New Category', // Sabit kategori
      cost: Math.random() * 100, // Rastgele maliyet
    };

    // Yeni öğeyi orders array'ine ekliyoruz
    this.orders.push(newItem);
  }
  // Yeni bir pozisyon numarası almak için kullanılan metod
  getNextPosition(): number {
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.length > 0 ? orders[orders.length - 1].position + 1 : 1;
  }
  // LocalStorage'dan "orders" verisini alıyoruz ve box'a göre filtreliyoruz
  loadOrdersFromLocalStorage() {
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    // 'box' parametresine göre filtreleme yapıyoruz
    const filteredOrders = orders.filter(order => order.table === this.box);
    this.orders = filteredOrders;  // Filtrelenmiş veriyi 'orders' array'ine atıyoruz
    this.dataSource.data = this.orders;  // DataSource'u güncelliyoruz
  }

  // LocalStorage'a "orders" verisini kaydediyoruz
  saveOrdersToLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
}
