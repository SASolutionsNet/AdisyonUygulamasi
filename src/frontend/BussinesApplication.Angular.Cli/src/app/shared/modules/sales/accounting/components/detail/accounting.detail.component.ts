
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, Output, EventEmitter, SimpleChanges, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../../order/models/order.model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'sasolution-sales-accounting-detail',
  templateUrl: './accounting.detail.component.html',
  styleUrls: ['./accounting.detail.component.scss'],
  imports: [MatGridListModule, MatTabsModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule,]
})
export class AccountingDetailComponent implements OnInit, AfterViewInit {

  @Input() ELEMENT_DATA: Orders[] = []; // Dinamik veri için input

  @Output() closeTableClick: EventEmitter<any> = new EventEmitter<any>(); // Tile click event
  @Output() printOrdersClick: EventEmitter<any> = new EventEmitter<any>(); // Tile click event
  @Output() payAllOrdersClick: EventEmitter<any> = new EventEmitter<any>(); // Tile click event

  displayedColumns: string[] = ['index', 'name', 'cost'];  // 'index' sütununu başlıklarımıza ekliyoruz

  dataSource = new MatTableDataSource<Orders>(this.ELEMENT_DATA);  // Veriyi doğru şekilde tanımlıyoruz

  clickedRows = new Set<Orders>();
  selectedRows: Orders[] = [];  // Seçilen satırları ikinci tabloya aktaracağız
  paidRows: Orders[] = [];  // Ödenen satırları saklayacağız
  sumCost: number = 0; // Başlangıçta toplam tutar 0
  sumSelectedOrdersCost: number = 0; // Başlangıçta toplam tutar 0
  sumPaidOrdersCost: number = 0; // Başlangıçta toplam tutar 0


  sumCashCost: number = 0; // Başlangıçta toplam nakit tutar 0
  sumCardCost: number = 0; // Başlangıçta toplam kart tutar 0

  constructor(
    private router: Router, private cdRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fillDataSource();

    this.calculateSumCost();  // Toplamı yeniden hesaplayın
    this.calculateSelectedOrdersSumCost();
    this.calculatePaidOrdersSumCost();
  }

  fillDataSource() {
    const savedPaidOrders: Orders[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');

    // DataSource'daki her item'ın paid durumunu güncelle
    this.dataSource.data = this.dataSource.data.map(order => ({
      ...order,
      paid: savedPaidOrders.some(paidOrder =>
        paidOrder.uniqueId === order.uniqueId &&
        paidOrder.table === order.table
      )
    }));
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();  // Manuel olarak değişiklikleri tespit et
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ELEMENT_DATA']) {
      this.dataSource.data = [...this.ELEMENT_DATA]; // Yeni veri geldiğinde güncelle
      this.calculateSumCost();  // Toplamı yeniden hesaplayın
      this.calculateSelectedOrdersSumCost();
      this.calculatePaidOrdersSumCost();
    }
  }
  goTableList() {
    this.router.navigate([`/sales/accounting/list`]);
  }
  // Satır tıklama işlemi
  onRowClick(row: Orders): void {
    // Eğer satır ödenmişse, tıklanamaz
    if (row.paid) {
      return; // Eğer satır ödeme durumu "true" ise tıklanamaz
    }

    // Satır tıklanabilir ise işlemi yap
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);  // Eğer zaten seçiliyse, çıkar
    } else {
      this.clickedRows.add(row);  // Eğer seçili değilse, ekle
    }

    // Seçilen satırları ikinci tabloya aktar
    this.selectedRows = Array.from(this.clickedRows);
    this.calculateSumCost();  // Herhangi bir tile tıklandığında toplamı yeniden hesapla
    this.calculateSelectedOrdersSumCost();
    this.calculatePaidOrdersSumCost();
  }

  // Satırın seçili olup olmadığını kontrol et
  isRowSelected(row: Orders): boolean {
    return this.clickedRows.has(row);
  }



  // Orders fiyatlarının toplamını hesaplayan fonksiyon
  calculateSumCost(): void {
    this.sumCost = this.dataSource.data.reduce((total, order) => {
      return total + (order.price * order.quantity);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);
  }

  // SelectedOrders fiyatlarının toplamını hesaplayan fonksiyon
  calculateSelectedOrdersSumCost(): void {

    this.sumSelectedOrdersCost = this.selectedRows.reduce((total, order) => {
      return total + (order.price * order.quantity);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);
  }


  calculatePaidOrdersSumCost(): void {
    // ActivatedRoute'den table parametresini al
    const tableParam = this.route.snapshot.paramMap.get('box');
    let savedOrders: Orders[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
    let filteredOrders = savedOrders.filter(order =>
      order.table === tableParam
    );
    console.log(this.paidRows)

    // Filtrelenen kayıtlarda quantity ve cost değerlerinin çarpımını hesapla
    this.sumPaidOrdersCost = filteredOrders.reduce((total, order) => {
      return total + (order.quantity * order.price);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);
  }


  // closeTableClick için işlem
  closeTable(): void {
    console.log("masa kapandı");

    this.closeTableClick.emit();  // Event emiti çağırın
  }

  // printOrdersClick için işlem
  printOrders(): void {
    console.log("yazdır");
    this.printOrdersClick.emit();  // Event emiti çağırın
  }


  payAllOrdersByCash(): void {
    const tableParam = this.route.snapshot.paramMap.get('box');  // 'box' URL parametresinin adı olmalı
    const paidIds = new Set(this.paidRows.map(order => order.uniqueId));

    // Tüm siparişler üzerinde döngü yaparak, paidRows içinde olmayanların durumunu "paid" olarak güncelle
    this.dataSource.data.filter(paidOrder =>
      paidOrder.table === tableParam).forEach(order => {
        // Eğer order paidRows içinde değilse, bu siparişi ödenmiş olarak işaretle
        if (!paidIds.has(order.uniqueId)) {
          if (order.paid != true) {
            order.paymentMethods = "cash";
          }
          order.paid = true;

          this.paidRows.push(order);  // Ödenmiş satırı paidRows'a ekle
        }
      });

    // Seçilen satırları localStorage'a kaydedin
    const updatedOrders = this.paidRows;
    localStorage.setItem('paidOrders', JSON.stringify(updatedOrders)); // Veriyi localStorage'a kaydedin

    //this.calculateSumCost();  // Toplamı yeniden hesaplayın
    this.calculatePaidOrdersSumCost();

    // Seçilen satırları sıfırla
    this.selectedRows = [];
    this.clickedRows.clear();  // Seçili satırları temizle
  }
  payAllOrdersByCard(): void {
    const tableParam = this.route.snapshot.paramMap.get('box');  // 'box' URL parametresinin adı olmalı
    console.log("paidRows", this.paidRows)
    const paidIds = new Set(this.paidRows.map(order => order.uniqueId));

    console.log("paidIds", paidIds);
    console.log(" this.dataSource.data", this.dataSource.data);

    // Tüm siparişler üzerinde döngü yaparak, paidRows içinde olmayanların durumunu "paid" olarak güncelle
    this.dataSource.data.filter(paidOrder =>
      paidOrder.table === tableParam).forEach(order => {
        // Eğer order paidRows içinde değilse, bu siparişi ödenmiş olarak işaretle
        if (!paidIds.has(order.uniqueId)) {
          if (order.paid != true) {
            order.paymentMethods = "card";
          }
          order.paid = true;
         
          this.paidRows.push(order);  // Ödenmiş satırı paidRows'a ekle
        }
      });

    // Seçilen satırları localStorage'a kaydedin
    const updatedOrders = this.paidRows;
    localStorage.setItem('paidOrders', JSON.stringify(updatedOrders)); // Veriyi localStorage'a kaydedin

    //this.calculateSumCost();  // Toplamı yeniden hesaplayın
    this.calculatePaidOrdersSumCost();

    // Seçilen satırları sıfırla
    this.selectedRows = [];
    this.clickedRows.clear();  // Seçili satırları temizle
  }


  // Seçilen satırları "paid" olarak işaretleme
  paySelectedOrdersByCardClick(): void {
    // Seçilen siparişlerin uniqueId'lerini al
    const selectedIds = new Set(this.selectedRows.map(order => order.uniqueId));

    // DataSource'u IMMUTABLE şekilde güncelle
    this.dataSource.data = this.dataSource.data.map(order => {
      if (selectedIds.has(order.uniqueId)) {
        return { ...order, paid: true, paymentMethods: "card" }; // Yeni obje oluştur
      }
      return order;
    });

    // LocalStorage'a yeni durumu kaydet
    const updatedPaidOrders = [
      ...JSON.parse(localStorage.getItem('paidOrders') || "[]"),
      ...this.selectedRows.map(order => ({ ...order, paid: true, paymentMethods: "card" }))
    ];
    localStorage.setItem('paidOrders', JSON.stringify(updatedPaidOrders));

    // Değişiklikleri manuel olarak tetikle
    this.calculatePaidOrdersSumCost();

    this.cdRef.detectChanges();

    // Seçimleri temizle
    this.selectedRows = [];
    this.clickedRows.clear();
  }

  // Seçilen satırları "paid" olarak işaretleme
  paySelectedOrdersByCashClick(): void { //cash olarak
    // Seçilen siparişlerin uniqueId'lerini al
    const selectedIds = new Set(this.selectedRows.map(order => order.uniqueId));

    // DataSource'u IMMUTABLE şekilde güncelle
    this.dataSource.data = this.dataSource.data.map(order => {
      if (selectedIds.has(order.uniqueId)) {
        return { ...order, paid: true, paymentMethods: "cash" }; // Yeni obje oluştur
      }
      return order;
    });

    // LocalStorage'a yeni durumu kaydet
    const updatedPaidOrders = [
      ...JSON.parse(localStorage.getItem('paidOrders') || "[]"),
      ...this.selectedRows.map(order => ({ ...order, paid: true, paymentMethods: "cash" }))
    ];
    localStorage.setItem('paidOrders', JSON.stringify(updatedPaidOrders));
    this.calculatePaidOrdersSumCost();

    // Değişiklikleri manuel olarak tetikle
    this.cdRef.detectChanges();

    // Seçimleri temizle
    this.selectedRows = [];
    this.clickedRows.clear();
  }

}

