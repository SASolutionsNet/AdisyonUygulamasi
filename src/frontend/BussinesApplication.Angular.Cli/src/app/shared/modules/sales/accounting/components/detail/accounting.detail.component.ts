
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, Input, Output, EventEmitter, SimpleChanges, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Order {
  id: string;
  table: string;
  productName: string;
  cost: number;
  paid: boolean;  // Satırların ödeme durumu
  quantity: number;
}

@Component({
  selector: 'sasolution-sales-accounting-detail',
  templateUrl: './accounting.detail.component.html',
  styleUrls: ['./accounting.detail.component.scss'],
  imports: [MatGridListModule, MatTabsModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule]
})
export class AccountingDetailComponent implements OnInit, AfterViewInit {

  @Input() ELEMENT_DATA: Order[] = []; // Dinamik veri için input

  @Output() closeTableClick: EventEmitter<any> = new EventEmitter<any>(); // Tile click event
  @Output() printOrdersClick: EventEmitter<any> = new EventEmitter<any>(); // Tile click event
  @Output() payAllOrdersClick: EventEmitter<any> = new EventEmitter<any>(); // Tile click event

  displayedColumns: string[] = ['index', 'name', 'cost'];  // 'index' sütununu başlıklarımıza ekliyoruz

  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);  // Veriyi doğru şekilde tanımlıyoruz

  clickedRows = new Set<Order>();
  selectedRows: Order[] = [];  // Seçilen satırları ikinci tabloya aktaracağız
  paidRows: Order[] = [];  // Ödenen satırları saklayacağız
  sumCost: number = 0; // Başlangıçta toplam tutar 0
  sumSelectedOrdersCost: number = 0; // Başlangıçta toplam tutar 0
  sumPaidOrdersCost: number = 0; // Başlangıçta toplam tutar 0

  constructor(private cdRef: ChangeDetectorRef, private route: ActivatedRoute,) { }

  ngOnInit() {
    // localStorage'dan ödenmiş siparişleri al
    const savedPaidOrders = JSON.parse(localStorage.getItem('paidOrders') || '[]');
    this.paidRows = savedPaidOrders;  // Sayfa yüklendiğinde 'paidOrders' verilerini al

    // Ödenmiş siparişleri dataSource'tan çıkarmak
    this.dataSource.data.forEach(order => {
      // Ödenmiş siparişlerle eşleşen satırları işaretle
      const matchingPaidOrders = this.paidRows.filter(paidOrder =>
        paidOrder.id === order.id && paidOrder.table === order.table);

      // Eğer eşleşen ödenmiş siparişler varsa ve miktarları eşitse
      const isPaid = matchingPaidOrders.length === order.quantity;

      if (isPaid) {
        order.paid = true;  // Bu satır 'paid' olarak işaretlendi
      } else {
        order.paid = false;  // Eğer eşleşme yoksa, 'paid' olarak işaretleme
      }
    });

    // Yeni güncellenmiş veriyi dataSource'a atayın
    this.dataSource.data = [...this.dataSource.data]; // Bu satır çok önemli!

    this.calculateSumCost();  // Toplamı yeniden hesaplayın
    this.calculateSelectedOrdersSumCost();
    this.calculatePaidOrdersSumCost();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();  // Manuel olarak değişiklikleri tespit et
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ELEMENT_DATA']) {
      this.dataSource.data = [...this.ELEMENT_DATA]; // Yeni veri geldiğinde güncelle
    }
  }

  // Satır tıklama işlemi
  onRowClick(row: Order): void {
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
  isRowSelected(row: Order): boolean {
    return this.clickedRows.has(row);
  }

  // Seçilen satırları "paid" olarak işaretleme
  paySelectedOrdersClick(): void {
    // Seçilen satırları "paid" olarak işaretleyin ve güncelleyin
    this.selectedRows.forEach(order => {
      order.paid = true;  // Satır ödeme olarak işaretlendi
      this.paidRows.push(order);  // Ödenen satırları güncelle
    });

    // Seçilen satırları localStorage'a kaydedin
    const updatedOrders = this.paidRows;
    localStorage.setItem('paidOrders', JSON.stringify(updatedOrders)); // Veriyi localStorage'a kaydedin

    this.calculateSumCost();  // Toplamı yeniden hesaplayın
    this.calculatePaidOrdersSumCost();

    // Seçilen satırları sıfırla
    this.selectedRows = [];
    this.clickedRows.clear();  // Seçili satırları temizle
  }

  // Orders fiyatlarının toplamını hesaplayan fonksiyon
  calculateSumCost(): void {
    this.sumCost = this.dataSource.data.reduce((total, order) => {
      return total + (order.cost * order.quantity);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);
  }

  // SelectedOrders fiyatlarının toplamını hesaplayan fonksiyon
  calculateSelectedOrdersSumCost(): void {

    this.sumSelectedOrdersCost = this.selectedRows.reduce((total, order) => {
      return total + (order.cost * order.quantity);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);
  }


  calculatePaidOrdersSumCost(): void {
    // ActivatedRoute'den table parametresini al
    const tableParam = this.route.snapshot.paramMap.get('box');  // 'box' URL parametresinin adı olmalı
    console.log(tableParam)
    /* if (tableParam) {*/
    // localStorage'dan salesAccountingOrders verisini al
    let savedOrders: Order[] = JSON.parse(localStorage.getItem('paidOrders') || '[]');
    // Table parametre ile eşleşen ve paid durumu false olan kayıtları filtrele
    let filteredOrders = savedOrders.filter(order =>
      order.table === tableParam
    );
    console.log(this.paidRows)

    // Filtrelenen kayıtlarda quantity ve cost değerlerinin çarpımını hesapla
    this.sumPaidOrdersCost = filteredOrders.reduce((total, order) => {
      return total + (order.quantity * order.cost);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);
    /*}*/
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


  payAllOrders(): void {
    const tableParam = this.route.snapshot.paramMap.get('box');  // 'box' URL parametresinin adı olmalı

    // Tüm siparişler üzerinde döngü yaparak, paidRows içinde olmayanların durumunu "paid" olarak güncelle
    this.dataSource.data.filter(paidOrder =>
      paidOrder.table === tableParam).forEach(order => {
        // Eğer order paidRows içinde değilse, bu siparişi ödenmiş olarak işaretle
        if (!this.paidRows.includes(order)) {
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

}
