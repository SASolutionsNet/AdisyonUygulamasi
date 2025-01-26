
import { ChangeDetectorRef, Component, Input, Output, EventEmitter, SimpleChanges, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

export interface Order {
  position: number;
  name: string;
  category: string;
  cost: number;

}

//const ELEMENT_DATA: Order[] = [
//  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//];

@Component({
  selector: 'sasolution-sales-accounting-detail',
  templateUrl: './accounting.detail.component.html',
  styleUrls: ['./accounting.detail.component.scss'],
  imports: [MatGridListModule, MatTabsModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class AccountingDetailComponent implements OnInit, AfterViewInit {

  @Input() ELEMENT_DATA: Order[] = []; // Dinamik veri için input




  displayedColumns: string[] = ['position', 'name', 'category', 'cost'];  // 'action' sütununu ekledik.
  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);  // Veriyi doğru şekilde tanımlıyoruz
  clickedRows = new Set<Order>();

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadOrdersFromLocalStorage();  // LocalStorage'dan veriyi yükleyelim
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();  // Manuel olarak değişiklikleri tespit et
  }

  loadOrdersFromLocalStorage() {
    // LocalStorage'dan "Orders" verisini alıyoruz
    const orders: Order[] = JSON.parse(localStorage.getItem('Orders') || '[]');

    if (orders.length > 0) {
      this.dataSource = new MatTableDataSource(orders);  // Veriyi dataSource'a aktarıyoruz
    } else {
      // Eğer Orders listesi boşsa, default olarak boş bir liste veriyoruz
    /*  this.dataSource = new MatTableDataSource([]);*/
    }
  }

  // Row tıklandığında bu fonksiyon çağrılacak
  onRowClick(row: Order): void {
    // Satır tıklandığında, clickedRows setine ekleyin veya çıkarın
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);  // Eğer zaten varsa, çıkar
    } else {
      this.clickedRows.add(row);  // Eğer yoksa, ekle
    }
  }

}

