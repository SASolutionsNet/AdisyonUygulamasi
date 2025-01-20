import { Component, Injectable, ChangeDetectorRef, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'moment/locale/tr';


import { ErrorDialogComponent } from '../../../../errordialog/errordialog.component';




import { SalesOrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { SalesOrder } from '../../models/order.model';

@Component({
  selector: 'sasolution-sales-order-list',
  templateUrl: './order.list.component.html',
  styleUrls: ['./order.list.component.scss']
})
export class SalesOrderListComponent implements OnInit {
  private _rows: any;
    dataLoadedEvent: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    //private userService: UserService,
    private salesOrderService: SalesOrderService) {

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

  

}
