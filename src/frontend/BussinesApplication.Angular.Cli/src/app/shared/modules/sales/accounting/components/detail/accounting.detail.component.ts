
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
import { ActivatedRoute } from '@angular/router';

export interface Order {
  table: string;
  position: number;
  name: string;
  category: string;
  cost: number;

}

@Component({
  selector: 'sasolution-sales-accounting-detail',
  templateUrl: './accounting.detail.component.html',
  styleUrls: ['./accounting.detail.component.scss'],
  imports: [MatGridListModule, MatTabsModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class AccountingDetailComponent implements OnInit, AfterViewInit {

  @Input() ELEMENT_DATA: Order[] = []; // Dinamik veri için input

 /* @Output() buttonClicked = new EventEmitter<Order>();  // EventEmitter ile buttonClicked olayını yayıyoruz.*/


  displayedColumns: string[] = ['position', 'name', 'category', 'cost'];  // 'action' sütununu ekledik.
  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);  // Veriyi doğru şekilde tanımlıyoruz

  clickedRows = new Set<Order>();
  selectedRows: Order[] = [];  // Seçilen satırları ikinci tabloya aktaracağız

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();  // Manuel olarak değişiklikleri tespit et
  }

  // ELEMENT_DATA değiştikçe dataSource'u güncelle
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ELEMENT_DATA']) {
      this.dataSource.data = [...this.ELEMENT_DATA]; // Yeni veri geldiğinde güncelle
    }
  }

 


  // Satır tıklama işlemi
  onRowClick(row: Order): void {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);  // Eğer zaten seçiliyse, çıkar
    } else {
      this.clickedRows.add(row);  // Eğer seçili değilse, ekle
    }
    // Seçilen satırları ikinci tabloya aktar
    this.selectedRows = Array.from(this.clickedRows);
  }

  // Satırın seçili olup olmadığını kontrol et
  isRowSelected(row: Order): boolean {
    return this.clickedRows.has(row);
  }
  //onClick(element: Order): void {
  //  console.log('Tıklanan satır:', element);  // Burada veriyi kontrol edebilirsiniz
  //  this.buttonClicked.emit(element);  // 'Order' objesini dışarıya gönderiyoruz
  //}
}

