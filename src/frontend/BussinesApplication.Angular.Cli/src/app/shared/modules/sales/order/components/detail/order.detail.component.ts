import { Component, Injectable, NgZone, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
/*import * as moment from 'moment';*/
import 'moment/locale/tr';

import { ErrorDialogComponent } from '../../../../errordialog/errordialog.component';

/*import { environment } from '../../../../../../../environments/environment';*/

import { Product } from '../../../../ps/models/ps.model';
import { PSService } from '../../../../ps/services/ps.service';


import { SalesOrderService } from '../../../../sales/order/services/order.service';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogChangeTableComponent } from '../../../../dialogchangetable/dialogchangetable.component';

// PeriodicElement arayüzünü burada tanımlıyoruz
export interface Order {
  table: string;
  position: number;
  name: string;
  category: string;
  cost: number;
}
@Component({
  selector: 'sasolution-sales-order-detail',

  templateUrl: './order.detail.component.html',
  styleUrls: ['./order.detail.component.scss'],
  imports: [MatGridListModule, MatTabsModule, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule,MatIconModule],
})
export class OrderDetailComponent implements OnInit, OnDestroy, AfterViewInit {


  @Input() tabs: any[] = [];  // Dinamik tablar için input
  @Input() ELEMENT_DATA: Order[] = []; // Dinamik veri için input

  @Output() tileClicked: EventEmitter<number> = new EventEmitter<number>(); // Tile click event
  @Output() buttonClicked = new EventEmitter<Order>();  // EventEmitter ile buttonClicked olayını yayıyoruz.



  displayedColumns: string[] = ['name', 'cost','action'];  // 'action' sütununu ekledik.
  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);  // Veriyi doğru şekilde tanımlıyoruz

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }
    ngOnInit(): void {
       
    }
    ngOnDestroy(): void {
       
    }

  ngAfterViewInit(): void {
    // Yenileme için Change Detection tetikleme
    this.cdRef.detectChanges();
  }

  // ELEMENT_DATA değiştikçe dataSource'u güncelle
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ELEMENT_DATA']) {
      this.dataSource.data = [...this.ELEMENT_DATA]; // Yeni veri geldiğinde güncelle
    }
  }

  // Her tıklamada tetiklenecek fonksiyon
  onTileClick(tileNumber: number): void {
    console.log('Tile clicked:', tileNumber); // Tıklanan tile'ı görmek için log ekliyoruz
    this.tileClicked.emit(tileNumber); // Tıklanan numarayı dışarıya gönderiyoruz
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }
 
  onClick(element: Order): void {
    console.log('Tıklanan satır:', element);  // Burada veriyi kontrol edebilirsiniz
    this.buttonClicked.emit(element);  // 'Order' objesini dışarıya gönderiyoruz
  }
  // Yuvarlama işlemi
  formatCost(cost: number): string {
    return cost.toFixed(2);  // 2 ondalıklı basamağa yuvarlar
  }

  openPopup() {
    this.route.paramMap.subscribe(params => {
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
