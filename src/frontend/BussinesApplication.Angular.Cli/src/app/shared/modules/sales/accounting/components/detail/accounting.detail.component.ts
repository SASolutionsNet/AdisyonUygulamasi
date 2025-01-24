import { Component, Injectable, NgZone, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
/*import * as moment from 'moment';*/
import 'moment/locale/tr';

import { ErrorDialogComponent } from '../../../../errordialog/errordialog.component';

/*import { environment } from '../../../../../../../environments/environment';*/
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'sasolution-sales-accounting-detail',
  templateUrl: './accounting.detail.component.html',
  styleUrls: ['./accounting.detail.component.scss'],
  imports: [MatGridListModule, MatTabsModule, CommonModule, MatTableModule],
})
export class AccountingDetailComponent implements OnInit, AfterViewInit {
  selectedTiles: string[] = [];
  transactions: { item: string, cost: number }[] = [];
  displayedColumns: string[] = ['URUN', 'TUTAR']; // Burada footer'daki sütunları belirtiyoruz


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private dialog: MatDialog) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    //this.datePickerMinDate = moment().utc().add(1, 'd').local().toDate();
    //this.datePickerStartDate = this.datePickerMinDate;


  }

  ngOnChanges(): void {
    // Yenileme için Change Detection tetikleme
    this.cdRef.detectChanges();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    // Yenileme için Change Detection tetikleme
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }




  onTileClick(tileNumber: number) {
    console.log(`Tile ${tileNumber} clicked`);
    const newItem = `Sipariş ${tileNumber}`;
    this.selectedTiles.push(newItem);

    const transaction = {
      item: newItem,
      cost: Math.floor(Math.random() * 100) + 1,
    };
    this.transactions.push(transaction);
    
  }

  // Toplam maliyet hesaplama fonksiyonu
  getTotalCost(): number {
    return this.transactions.reduce((acc, curr) => acc + curr.cost, 0);
  }
}
