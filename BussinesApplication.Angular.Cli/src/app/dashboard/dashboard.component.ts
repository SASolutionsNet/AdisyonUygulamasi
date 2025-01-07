import { Component, OnInit, OnDestroy, ViewChild, HostListener, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
/*import * as moment from 'moment';*/
import 'moment/locale/tr';

/*import { environment } from '../../environments/environment';*/

import { ErrorDialogComponent } from '../shared/modules/errordialog/errordialog.component';

import { ValueFormatterService } from '../shared/modules/common/value.formatter.service';

import { AuthService } from '../shared/modules/auth/auth.service';


import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';
import { PSService } from '../shared/modules/ps/services/ps.service';

import { QueryOptions } from '../shared/modules/common/QueryOptions';
import { SalesOrderService } from '../shared/modules/sales/order/services/order.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

 
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private valueFormatterService: ValueFormatterService,
    private authService: AuthService,
    private psCategoryService: PSCategoryService,
    private psService: PSService,
  /*  private userService: UserService,*/
    private salesOrderService: SalesOrderService) {

    //this.environment = environment;

  }

  ngOnInit() {
   
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  
  }

 
}
