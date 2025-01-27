
//import { ChangeDetectorRef, Component, OnInit, SimpleChanges, ɵɵqueryRefresh } from '@angular/core';
//import { MatCardModule } from '@angular/material/card';
//import { HeaderComponent } from '../../../header/header.component';
//import { SidebarComponent } from '../../../sidebar/sidebar.component';
//import { AccountingDetailComponent, PeriodicElement } from '../../../shared/modules/sales/accounting/components/detail/accounting.detail.component'; // PeriodicElement türünü import ettiğimize emin olun.

//@Component({
//  selector: 'app-sales-accounting-detail',
//  templateUrl: './sales.accounting.detail.component.html',
//  styleUrls: ['./sales.accounting.detail.component.scss'],
//  standalone: true,
//  imports: [AccountingDetailComponent,MatCardModule, HeaderComponent, SidebarComponent]  // Standalone bileşenler
//})
//export class SalesAccountingDetailComponent implements OnInit {

//  tabsData = [
//    { label: 'Sık Kullanılanlar', tiles: [1, 2, 3, 4, 5] },
//    { label: 'Sıcak Meşrubatlar', tiles: [6, 7, 8, 9, 10] },
//    { label: 'Soğuk Meşrubatlar', tiles: [11, 12, 13, 14, 15] }
//  ];
 
//  ELEMENT_DATA: PeriodicElement[] = [];
//  dataSource: PeriodicElement[] = this.ELEMENT_DATA; // dataSource başlangıçta ELEMENT_DATA ile başlar
//  displayedColumns: string[] = ['position', 'name', 'category', 'cost'];

//   itemNo: number = 0 ;

//  constructor(private cdRef: ChangeDetectorRef) { }

//  ngOnInit() {
//    // İlk veri yüklemesi burada yapılabilir
   
//    if (this.itemNo != 0) {
//      this.setData(this.itemNo);
//      this.dataSource = [...this.ELEMENT_DATA];  // dataSource'u güncelle
//}
    
//  }

//  ngOnChanges() {
//    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
//    this.cdRef.detectChanges();
//  }

//  ngAfterViewChecked() {
//    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
//    this.cdRef.detectChanges();
//  }

//  // Toplam maliyeti hesaplama fonksiyonu
//  getTotalCost(): number {
//    return this.ELEMENT_DATA.reduce((acc, curr) => acc + curr.cost, 0);
//  }

//  // Tile tıklama fonksiyonu, yeni öğe ekliyor
//  onTileClick(tileNumber: number): void {
//    this.itemNo = tileNumber;
//    this.setData(this.itemNo);
   
//  }
//  setData(tileNumber: number): void {
//    let newItem: PeriodicElement = {
//      position: this.ELEMENT_DATA.length + 1,  // Son pozisyon + 1
//      name: `Item ${tileNumber}`,
//      category: "New Category",  // Sabit kategori
//      cost: Math.random() * 100,  // Rastgele maliyet
//    };

//    this.ELEMENT_DATA.push(newItem);  // Yeni öğeyi ekle
//    this.dataSource = [...this.ELEMENT_DATA];  // dataSource'u güncelle
//    this.cdRef.detectChanges();  // Değişiklikleri tetiklemek için detectChanges kullanabiliriz
//  }
//}

import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountingDetailComponent } from '../../../shared/modules/sales/accounting/components/detail/accounting.detail.component';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-sales-accounting-detail',
  templateUrl: './sales.accounting.detail.component.html',
  styleUrls: ['./sales.accounting.detail.component.scss'],
  standalone: true,
  imports: [AccountingDetailComponent, MatCardModule, HeaderComponent, SidebarComponent]  // Standalone bileşenler
})
export class SalesAccountingDetailComponent implements OnInit {

  //tabsData = [
  //  { label: 'Sık Kullanılanlar', tiles: [1, 2, 3, 4, 5] },
  //  { label: 'Sıcak Meşrubatlar', tiles: [6, 7, 8, 9, 10] },
  //  { label: 'Soğuk Meşrubatlar', tiles: [11, 12, 13, 14, 15] }
  //];

  //ELEMENT_DATA: PeriodicElement[] = [];
  //displayedColumns: string[] = ['position', 'name', 'category', 'cost'];

  //dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource(this.ELEMENT_DATA);

  //itemNo: number = 0;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // İlk veri yüklemesi yapılabilir
    //if (this.itemNo !== 0) {
    //  this.setData(this.itemNo);
    //}
  }

  ngOnChanges() {
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  //getTotalCost(): number {
  //  return this.ELEMENT_DATA.reduce((acc, curr) => acc + curr.cost, 0);
  //}

  //onTileClick(tileNumber: number): void {
  //  this.itemNo = tileNumber;
  //  this.setData(this.itemNo);
  //  console.log(this.ELEMENT_DATA);
  //}

  //setData(tileNumber: number): void {
  //  const newItem: PeriodicElement = {
  //    position: this.ELEMENT_DATA.length + 1,  // Son pozisyon + 1
  //    name: `Item ${tileNumber}`,
  //    category: "New Category",  // Sabit kategori
  //    cost: Math.random() * 100,  // Rastgele maliyet
  //  };

  //  this.ELEMENT_DATA.push(newItem);  // Yeni öğeyi ekle
  //  this.cdRef.detectChanges();  // Değişiklikleri tespit etmek için detectChanges kullanabiliriz
  //}
}
