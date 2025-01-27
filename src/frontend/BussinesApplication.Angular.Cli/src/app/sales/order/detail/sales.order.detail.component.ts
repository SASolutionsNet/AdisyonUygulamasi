
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
  table: string;
  position: number;
  name: string;
  category: string;
  cost: number;
}

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales.order.detail.component.html',
  styleUrls: ['./sales.order.detail.component.scss'],
  imports: [OrderDetailComponent, HeaderComponent, SidebarComponent, MatCardModule, MatPaginatorModule, MatButtonModule],
  standalone: true,
})
export class SalesOrderDetailComponent implements OnInit {

  tabsData = [
    { label: 'Sık Kullanılanlar', tiles: ["Çay", "Kahve", "Oralet", "3/4 Tost", "Gofret"] },
    { label: 'Sıcak Meşrubatlar', tiles: ["Çay", "Kahve", "Oralet", "S. Çikolata", "Salep"] },
    { label: 'Soğuk Meşrubatlar', tiles: ["Ayran", "Soda", "Gazoz", "M. Soda", "Fanta"] }
  ];

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

  // Tile tıklandığında çağrılacak metod
  onTileClick(tileNumber: number): void {
    this.setData(tileNumber);
    this.saveOrdersToLocalStorage();  // Veriyi localStorage'a kaydediyoruz
    this.loadOrdersFromLocalStorage();  // Veriyi tekrar yüklüyoruz
    this.cdRef.detectChanges();  // Değişiklikleri manuel olarak tespit ederiz
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

  // Siparişi silme işlemi
  handleButtonClick(order: Order): void {
    if (!order) {
      console.error('Hata: Tıklanan satır verisi bulunamadı!');
      return;
    }

    console.log('Tıklanan satır:', order);

    // LocalStorage'dan "orders" verisini alıyoruz
    let orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

    // Tıklanan 'Order'ı diziden çıkarıyoruz
    orders = orders.filter(o => o.position !== order.position);

    // Güncellenmiş veriyi tekrar localStorage'a kaydediyoruz
    localStorage.setItem('orders', JSON.stringify(orders));

    // Güncellenmiş veriyi UI'ye yansıtmak için dataSource'u güncelleriz
    this.orders = orders;
    this.dataSource.data = this.orders;

    console.log('Updated orders:', orders);
  }

  // Toplam maliyeti hesaplama
  getTotalCost(): number {
    return this.orders.reduce((acc, curr) => acc + curr.cost, 0);
  }
}
