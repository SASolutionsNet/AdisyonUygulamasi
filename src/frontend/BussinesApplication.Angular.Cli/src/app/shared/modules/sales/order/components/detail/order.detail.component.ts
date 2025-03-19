import { Component, Injectable, NgZone, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

import { Product } from '../../../../ps/models/ps.model';
import { PSService } from '../../../../ps/services/ps.service';

import { SalesOrderService } from '../../../../sales/order/services/order.service';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogChangeTableComponent } from '../../../../dialogchangetable/dialogchangetable.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Orders, SalesOrder } from '../../models/order.model';

@Component({
  selector: 'sasolution-sales-order-detail',
  templateUrl: './order.detail.component.html',
  styleUrls: ['./order.detail.component.scss'],
  imports: [MatPaginatorModule,MatGridListModule, MatTabsModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule],
})
export class OrderDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() tabs: any[] = [];  // Dinamik tablar için input
  @Input() ELEMENT_DATA: Orders[] = []; // Dinamik veri için input

  @Output() tileClicked: EventEmitter<any> = new EventEmitter<any>(); // Tile click event
  @Output() buttonClicked = new EventEmitter<Orders>();  // EventEmitter ile buttonClicked olayını yayıyoruz.

  /*@ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator'ı erişebilmek için ViewChild ile alıyoruz*/
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort; // MatSort'ı erişebilmek için ViewChild ile alıyoruz

  displayedColumns: string[] = ['rowNumber', 'name', 'cost', 'action'];  // 'action' sütununu ekledik.
  dataSource = new MatTableDataSource<Orders>(this.ELEMENT_DATA);  // Veriyi doğru şekilde tanımlıyoruz
  sumCost: number = 0; // Başlangıçta toplam tutar 0
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private orderService: SalesOrderService,
    private productService: PSService,
  ) { }

  ngOnInit(): void {
    // Initialization logic here
   
      this.dataSource.data = [...this.ELEMENT_DATA]; // Ensure a new array reference is set
      this.cdRef.detectChanges();  // Trigger change detection after updating data
    this.calculateSumCost();  // Başlangıçta toplam tutarı hesapla
  }

  ngOnDestroy(): void {
    // Cleanup logic here
  }

  ngAfterViewInit(): void {
    // Paginator ve Sort işlemleri ngAfterViewInit içinde yapılır, çünkü bu işlem görünümdeki öğeler tamamlandıktan sonra yapılır
    this.dataSource.sort = this.sort;
    // Yenileme için Change Detection tetikleme
    this.cdRef.detectChanges();
    this.calculateSumCost();  // Başlangıçta toplam tutarı hesapla
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ELEMENT_DATA']) {
      this.dataSource.data = [...this.ELEMENT_DATA]; // Ensure a new array reference is set
      this.cdRef.detectChanges();  // Trigger change detection after updating data
      this.calculateSumCost();  // Başlangıçta toplam tutarı hesapla
    }
  }

  ngAfterViewChecked() {
    // Eğer herhangi bir değişiklik algılanırsa, explicit olarak change detection yapıyoruz
    this.cdRef.detectChanges();
  }
  // Handle page change
  onPageChanged(event: any) {
    console.log('Page changed: ', event);
  }
  // Orders fiyatlarının toplamını hesaplayan fonksiyon
  calculateSumCost(): void {
    this.sumCost = this.dataSource.data.reduce((total, order) => {
      return total + (order.cost * order.quantity);  // Fiyat ve miktarı çarparak toplamı alıyoruz
    }, 0);

    console.log("this.sumCost", this.sumCost);
  }
  // Her tıklamada tetiklenecek fonksiyon
  onTileClick(tileNumber: number): void {
 
    console.log('Tile clicked:', tileNumber); // Tıklanan tile'ı görmek için log ekliyoruz
    this.tileClicked.emit(tileNumber); // Tıklanan numarayı dışarıya gönderiyoruz
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
    this.calculateSumCost();  // Herhangi bir tile tıklandığında toplamı yeniden hesapla
  }

  // 'Order' satırına tıklandığında tetiklenen fonksiyon
  onClick(element: Orders): void {

    console.log('Tıklanan satır:', element);  // Burada veriyi kontrol edebilirsiniz
    this.buttonClicked.emit(element);  // 'Order' objesini dışarıya gönderiyoruz
    this.calculateSumCost();  // Başlangıçta toplam tutarı hesapla
  }

  // Yuvarlama işlemi
  formatCost(cost: number): string {
    return cost.toFixed(2);  // 2 ondalıklı basamağa yuvarlar
  }
  goTableList() {
    this.router.navigate([`/sales/order/list`]);
  }

  // Popup açma fonksiyonu
  openPopup() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('box');  // Dinamik olarak parametreyi alıyoruz
      console.log('Dinamik URL parametresi:', id);

      if (id === null) {
        console.error('Dinamik URL parametresi alınamadı!');
      }

      // Popup bileşenine id parametresini gönderiyoruz
      this.dialog.open(DialogChangeTableComponent, {
        width: '1000px',
        data: { id }  // Parametreyi popup'a gönderiyoruz
      });
    });
  }
}

