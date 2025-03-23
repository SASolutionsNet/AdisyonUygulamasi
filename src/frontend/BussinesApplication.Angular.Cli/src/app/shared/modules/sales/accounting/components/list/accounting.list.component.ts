import { Component, Injectable, ChangeDetectorRef, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe locale


import { ErrorDialogComponent } from '../../../../errordialog/errordialog.component';




import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SalesAccountingService } from '../../services/accounting.service';
import { SalesAccounting } from '../../models/accounting.model';
import { MatIconModule } from '@angular/material/icon';
import { SignalrService } from '../../../order/services/signalr.service';

@Component({
  selector: 'sasolution-sales-accounting-list',
  templateUrl: './accounting.list.component.html',
  styleUrls: ['./accounting.list.component.scss'],
  imports: [MatTabsModule, CommonModule, MatIconModule],
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
    private signalRService: SignalrService,
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

    this.signalRService.startConnection();
    this.signalRService.addOrderListener(() => {
      console.log("Sipraiş güncellemsi oldu.");
      this.setDistinctTables();
    });

  }

  setDistinctTables() {
    this.accountingService.getAllOpenBills().subscribe(response => {
      if (Array.isArray(response)) {
        this.bills = response;
        console.log(this.bills)
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


  hasOrder(box: string): boolean {
    return this.bills.filter(x => x.table == box)[0].orders.length != 0;
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
