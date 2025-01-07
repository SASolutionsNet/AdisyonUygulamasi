import { Component, Injectable, NgZone, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
/*import * as moment from 'moment';*/
import 'moment/locale/tr';

import { ErrorDialogComponent } from '../../../../errordialog/errordialog.component';

/*import { environment } from '../../../../../../../environments/environment';*/
import { ValueFormatterService } from '../../../../common/value.formatter.service';
import { ValidationError } from '../../../../common/validationError';

import { TurkishStringService } from '../../../../../string/turkish.string.service';

import { AuthService } from '../../../../auth/auth.service';

import { PS } from '../../../../ps/models/ps.model';
import { PSService } from '../../../../ps/services/ps.service';

import { PSCategory, PSCategoryService } from '../../../../pscategory/pscategory.service';

import { SalesOrderService } from '../../../../sales/order/services/order.service';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'sasolution-sales-order-detail',
  templateUrl: './order.detail.component.html',
  styleUrls: ['./order.detail.component.scss']
})
export class SalesOrderDetailComponent implements OnInit, OnDestroy, AfterViewInit {

 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private valueFormatterService: ValueFormatterService,
    private turkishStringService: TurkishStringService,
    private authService: AuthService,
    private psService: PSService,
    private psCategoryService: PSCategoryService,
    private salesOrderService: SalesOrderService) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    //this.datePickerMinDate = moment().utc().add(1, 'd').local().toDate();
    //this.datePickerStartDate = this.datePickerMinDate;

   
  }

  ngOnChanges(): void {
  }

  ngOnInit() {
  
  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
  }

  adjustFormValues() {

  }

  emitSalesOrderLoadedEvent() {
  }

 
}
