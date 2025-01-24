import { Component, Injectable, ChangeDetectorRef, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'moment/locale/tr';


import { ErrorDialogComponent } from '../../../../errordialog/errordialog.component';




import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sasolution-sales-accounting-list',
  templateUrl: './accounting.list.component.html',
  styleUrls: ['./accounting.list.component.scss'],
  imports: [MatTabsModule, CommonModule],
})
export class AccountingListComponent implements OnInit {
  private _rows: any;
    dataLoadedEvent: any;

  salonBoxes: string[] = Array.from({ length: 24 }, (_, i) => `S${i + 1}`);
  bahceBoxes: string[] = Array.from({ length: 24 }, (_, i) => `B${i + 1}`);


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    //this.datePickerMinDate = moment().utc().subtract(2, 'days').local().toDate();
    //this.datePickerStartDate = this.datePickerMinDate;

  }

  ngOnInit() {
    
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }
  onBoxClick(box: string) {
    console.log(`${box} clicked`);
  }

}
