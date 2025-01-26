import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../header/header.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { OrderDetailComponent } from "../../../shared/modules/sales/order/components/detail/order.detail.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";

interface Order {
  position: number;
  name: string;
  category: string;
  cost: number;
}

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales.order.detail.component.html',
  styleUrls: ['./sales.order.detail.component.scss'],
  imports: [OrderDetailComponent, HeaderComponent, SidebarComponent, MatCardModule, MatPaginatorModule, MatButtonModule],  // Burada standalone bileşeni 
  standalone: true,
})
export class SalesOrderDetailComponent implements OnInit {

  tabsData = [
    { label: 'Sık Kullanılanlar', tiles: ["Çay", "Kahve", "Oralet","3/4 Tost"," Gofret"] },
    { label: 'Sıcak Meşrubatlar', tiles: ["Çay","Kahve","Oralet","S. Çikolata", "Salep"] },
    { label: 'Soğuk Meşrubatlar', tiles: ["Ayran", "Soda", "Gazoz", "M. Soda", ""] }
  ];

  orders: Order[] = [];
 /* displayedColumns: string[] = ['position', 'name', 'category', 'cost','action'];*/
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
   // this.dataSource.data = this.orders;
    this.loadOrdersFromLocalStorage;
  }

  ngOnChanges() {
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getTotalCost(): number {
    return this.orders.reduce((acc, curr) => acc + curr.cost, 0);
  }

  // Tile tıklandığında çağrılacak metod
  onTileClick(tileNumber: number): void {
    this.setData(tileNumber);
    // Veriyi localStorage'a kaydedelim
    this.saveOrdersToLocalStorage();
    // Tabloyu güncellemek için dataSource'u güncelleriz
    /*this.dataSource.data = this.orders;*/
    this.cdRef.detectChanges();  // Değişiklikleri manuel olarak tespit ederiz
    this.loadOrdersFromLocalStorage();
  }

  // Yeni veriyi set etmek için kullanılan metod
  setData(tileNumber: number): void {
    const newItem: Order = {
      position: this.getNextPosition(), // Yeni pozisyon
      name: `${tileNumber}`, // Item adı
      category: 'New Category', // Sabit kategori
      cost: Math.random() * 100, // Rastgele maliyet
     
    };

    // Yeni öğeyi ELEMENT_DATA'ya ekliyoruz
    this.orders.push(newItem);
  }

  getNextPosition(): number {
    // LocalStorage'dan "orders" listesini alıyoruz
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    // Eğer "orders" listesi boşsa, yeni pozisyon 1 olacak
    return orders.length > 0 ? orders[orders.length - 1].position + 1 : 1;
  }

  loadOrdersFromLocalStorage() {
    // LocalStorage'dan "orders" verisini alıyoruz
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    this.orders = orders;  // LocalStorage'dan alınan veriyi ELEMENT_DATA'ya atıyoruz
    this.dataSource.data = this.orders;  // dataSource'u güncelliyoruz
  }

  saveOrdersToLocalStorage() {
    // LocalStorage'a "orders" verisini kaydediyoruz
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
  handleButtonClick(order: Order): void {
    if (!order) {
      console.error('Hata: Tıklanan satır verisi bulunamadı!');
      return;
    }

    console.log('Tıklanan satır:', order);

    // LocalStorage'dan "orders" verisini alıyoruz
    let orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

    // Tıklanan 'Order'ı diziden çıkarıyoruz
    orders = orders.filter(o => o.position !== order.position);  // 'position' eşleşen satırı çıkarır

    // Güncellenmiş veriyi tekrar localStorage'a kaydediyoruz
    localStorage.setItem('orders', JSON.stringify(orders));

    // Güncellenmiş veriyi UI'ye yansıtmak için dataSource'u güncelleriz
    this.orders = orders;
    this.dataSource.data = this.orders;

    console.log('Updated orders:', orders);
    this.loadOrdersFromLocalStorage();
  }



}
