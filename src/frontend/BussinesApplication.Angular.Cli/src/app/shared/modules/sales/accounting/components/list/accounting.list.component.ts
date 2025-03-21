import { Component, Injectable, ChangeDetectorRef, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe locale


import { ErrorDialogComponent } from '../../../../errordialog/errordialog.component';




import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../../../sales/accounting/detail/sales.accounting.detail.component';
import { SalesAccountingService } from '../../services/accounting.service';
import { SalesAccounting } from '../../models/accounting.model';

@Component({
  selector: 'sasolution-sales-accounting-list',
  templateUrl: './accounting.list.component.html',
  styleUrls: ['./accounting.list.component.scss'],
  imports: [MatTabsModule, CommonModule],
})
export class AccountingListComponent implements OnInit {
  private _rows: any;
  dataLoadedEvent: any;
  distinctTables: string[] = [];
  bills: SalesAccounting[] = [];
  salonBoxes: string[] = Array.from({ length: 16 }, (_, i) => `S${i + 1}`);
  bahceBoxes: string[] = Array.from({ length: 16 }, (_, i) => `B${i + 1}`);
  private reloadInterval: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private accountingService: SalesAccountingService,
    private dateAdapter: DateAdapter<Date>,) {
    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

  }

  ngOnInit() {
    this.setDistinctTables();
    // Sayfayı her 10 saniyede bir yenile
    //this.reloadInterval = setInterval(() => {
    //  this.setDistinctTables()
    //}, 300);
  }

  setDistinctTables() {
    this.accountingService.getAllOpenBills().subscribe(response => {
      if (Array.isArray(response)) {
        this.bills = response;
        this.distinctTables = this.bills.map(item => item.table);
      } else {
        this.distinctTables = [];
        console.error("Beklenen dizi formatında veri alınamadı!", response);
      }
    });
  }

  isOpen(box: string): boolean {
    return this.distinctTables.includes(box);
  }
  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }
  onBoxClick(box: string) {
    var billId = this.bills.filter(item => item.table == box)[0].id;
    this.router.navigate([`/sales/accounting/detail/${box}/${billId}`]);  // Yönlendirme
  }

}
