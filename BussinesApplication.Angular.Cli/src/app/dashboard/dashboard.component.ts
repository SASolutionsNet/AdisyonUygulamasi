import { Component, OnInit, OnDestroy, ViewChild, HostListener, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
import * as moment from 'moment';
import 'moment/locale/tr';

import { environment } from '../../environments/environment';

import { ErrorDialogComponent } from '../shared/modules/errordialog/errordialog.component';

import { ValueFormatterService } from '../shared/modules/common/value.formatter.service';

import { AuthService } from '../shared/modules/auth/auth.service';

import { InAppNotificationService, InAppNotification } from '../shared/modules/notification/inappnotification.service';

import { PartyService } from '../shared/modules/party/party.service';
import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';
import { PSService } from '../shared/modules/ps/services/ps.service';

import { ProcurementRequestService } from '../shared/modules/procurement/request/procurementrequest.service';
import { ProcurementPurchaseOrderService } from '../shared/modules/procurement/purchaseorder/purchaseorder.service';

import { SalesCustomerMeetingFormService } from '../shared/modules/sales/customermeetingform/services/customermeetingform.service';
import { SalesOfferService } from '../shared/modules/sales/offer/services/offer.service';

import { UserService } from '../shared/modules/user/services/user.service';
import { ProcurementPurchaseOrderItemService } from '../shared/modules/procurement/purchaseorderitem/services/purchaseorderitem.service';
import { SalesOrderService } from '../shared/modules/sales/order/services/order.service';
import { SalesReportGroupedSalesPerformanceData } from '../shared/modules/sales/report/models/report.model';
import { QueryOptions } from '../shared/modules/common/QueryOptions';

import { AccountingETACurrentBalance } from '../shared/modules/accountingetacurrentbalance/models/accountingetacurrentbalance.model';
import { AccountingETACurrentBalanceService } from '../shared/modules/accountingetacurrentbalance/services/accountingetacurrentbalance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  public environment: any = null;

  private tick: number;
  private timerSubscription: Subscription;

  partyCount = 0;
  psCategoryCount = 0;
  psCount = 0;
  userCount = 0;
  inAppNotificationCount = 0;

  procurementRequestWaitingApproveCount = 0;
  procurementRequestWaitingRFQCount = 0;
  procurementRequestWaitingBidCount = 0;
  purchaseOrderItemWaitingDeliveryCount = 0;

  salesModuleCustomerCount = 0;
  salesModuleCustomerInteractionCount = 0;
  salesModuleSalesOfferCount = 0;
  salesModuleSalesOfferStateOrderCount = 0;

  accountingETACurrentBalances: AccountingETACurrentBalance[] = [];

  currentYear: number = 0;

  globalChartOptions: any = {
    responsive: false,
    legend: {
      display: true,
      position: 'left'
    }
  };

  globalBarChartOptions: any = {
    responsive: false,
    legend: {
      display: false,
      position: 'left'
    }
  };

  // Pie
  pieChartColors: any[] = [{
    backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196fe', '#61227a']
  }];
  pieChartOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.globalChartOptions);
  pieChartLabels: string[] = ['Bilinmiyor', 'Fiyat', 'Ödeme Koşulları', 'Ürün/Hizmet', 'Bitiş Süresi', 'Sözleşme', 'Proje İptal'];
  pieChartData: number[] = [300, 500, 100, 200, 250, 400];
  pieChartType = 'pie';

  // Bar
  barChartColors: any[] = [{
    backgroundColor: ['#9c27b0', '#3f51b5', '#4caf50', '#f44336']
  }];
  barChartLabels: string[] = ['Görüşme', 'Teklif', 'Sipariş', 'Red'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [{
    data: [35, 20, 5, 15],
    //label: 'Series A',
    borderWidth: 1
  }];
  barChartOptions: any = Object.assign({
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        position: 'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: 9
        }
      }]
    }
  }, this.globalBarChartOptions);

  // Horizontal Bar Chart
  barChartHorizontalType = 'horizontalBar';
  barChartHorizontalOptions: any = Object.assign({
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 40
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }]
    }
  }, this.globalBarChartOptions);

  // ciro bar
  barChartLabelsRevenue: string[] = ['İskontolu', 'İskontosuz']; // #87cefa
  barChartDataRevenue: any[] = null;
  barChartColorsRevenue: any[] = [{
    backgroundColor: ['#87cefa', '#87cefa'],
    borderColor: ['#3f51b5', '#3f51b5']
  }];

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private valueFormatterService: ValueFormatterService,
    private authService: AuthService,
    private inAppNotificationService: InAppNotificationService,
    private partyService: PartyService,
    private psCategoryService: PSCategoryService,
    private psService: PSService,
    private userService: UserService,
    private procurementRequestService: ProcurementRequestService,
    private procurementPurchaseOrderItemService: ProcurementPurchaseOrderItemService,
    private procurementPurchaseOrderService: ProcurementPurchaseOrderService,
    private salesCustomerMeetingFormService: SalesCustomerMeetingFormService,
    private salesOfferService: SalesOfferService,
    private salesOrderService: SalesOrderService,
    private accountingETACurrentBalanceService: AccountingETACurrentBalanceService) {

    this.environment = environment;

  }

  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();

    this.getPartyCount();
    this.getPSCategoryCount();
    //this.getPSCount();
    this.getUserCount();

    this.checkAndCreateCurrencyParitiesYesterday();

    if (this.viewProcurementSummaryRow()) {
      this.getCountRequestsWaitingApprove();
      this.getCountRequestsWaitingRFQ();
      this.getCountRequestsWaitingBid();
      this.getCountPurchaseOrderItemsWaitingDelivery();
    }

    if (this.viewSalesSummaryRow()) {
      this.getCustomerCount();
      this.getCustomerInteractionCount();
      this.getSalesOfferCount();
      this.getSalesOfferStateOrderCount();

      this.getSalesReportSalesPersonSalesPerformanceData();
    }

    // 2019.08.21 after adding these into accounting reports, removed from dashboard
    //if (this.isCeo()) {
    //  this.getAccountingETACurrentBalances();
    //}

    let timer = TimerObservable.create(2000, 60000);
    this.timerSubscription = timer.subscribe(t => {
      this.tick = t;
      this.getInAppNotificationsForMeLastNDays();
    });
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  viewProcurementSummaryRow() {
    return this.authService.hasRoleClaim('power.user') || this.authService.hasRoleClaim('it.manager') || this.authService.hasRoleClaim('management.ceo') || this.authService.hasRoleClaim('procurement.user') || this.authService.hasRoleClaim('procurement.manager') || this.authService.hasRoleClaim('procurement.admin');
  }

  viewSalesSummaryRow() {
    let can = this.authService.hasRoleClaim('power.user') ||
      this.authService.hasRoleClaim('sales.user') || this.authService.hasRoleClaim('sales.manager') || this.authService.hasRoleClaim('sales.director') || this.authService.hasRoleClaim('sales.admin') ||
      this.authService.hasRoleClaim('project.designer') || this.authService.hasRoleClaim('project.manager') ||
      this.authService.hasRoleClaim('finance.user') || this.authService.hasRoleClaim('accounting.user') || this.authService.hasRoleClaim('accounting.manager') || this.authService.hasRoleClaim('accounting.director') || this.authService.hasRoleClaim('accounting.admin') ||
      this.authService.hasRoleClaim('it.manager') ||
      this.authService.hasRoleClaim('management.ceo') ||
      this.authService.hasRoleClaim('shipment.planner'); // requested by Recep Ceylan @ 2019.07.16
    return can;
  }

  isSalesManagerOrProjectManagerOrCeo() {
    let can = this.authService.hasRoleClaim('power.user') ||
      this.authService.hasRoleClaim('sales.manager') || 
      this.authService.hasRoleClaim('project.manager') || this.authService.hasRoleClaim('sales.director') ||
      this.authService.hasRoleClaim('it.manager') ||
      this.authService.hasRoleClaim('management.ceo');
    return can;
  }

  isCeo() {
    let can = this.authService.hasRoleClaim('power.user') ||
      this.authService.hasRoleClaim('management.ceo');
    return can;
  }

  isSalesPersonOrProjectDesigner() {
    let can = this.authService.hasRoleClaim('power.user') ||
      this.authService.hasRoleClaim('sales.user') ||
      this.authService.hasRoleClaim('project.designer');
    return can;
  }

  getPartyCount() {
    this.partyService.getCount()
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.partyCount = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  getPSCategoryCount() {
    this.psCategoryService.getCount()
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.psCategoryCount = data;
        }
        else {
          console.log('getPSCategoryCount(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getPSCategoryCount().err: ' + err);
        });
  }

  getPSCount() {
    this.psService.getCount()
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.psCount = data;
        }
        else {
          console.log('getPSCount(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getPSCount().err: ' + err);
        });
  }

  getUserCount() {
    this.userService.getCount()
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.userCount = data;
        }
        else {
          console.log('getUserCount(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getUserCount().err: ' + err);
        });
  }

  getInAppNotificationsForMeCount() {
    this.inAppNotificationService.getCountByToUserIdAndStateId("created")
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.inAppNotificationCount = data;
        }
        else {
          console.log('getInAppNotificationsForMeCount(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getInAppNotificationsForMeCount().err: ' + err);
        });
  }

  getInAppNotificationsForMeLastNDays() {
    this.inAppNotificationService.getByToUserIdAndStateIdAndLastNDays("created", 15)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: InAppNotification[] = httpServiceResult.result.data;

          this.inAppNotificationCount = data.length;
        }
        else {
          console.log('getInAppNotificationsForMeLastNDays(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getInAppNotificationsForMeLastNDays().err: ' + err);
        });
  }

  getCountRequestsWaitingApprove() {
    this.procurementRequestService.getCountByStateId("waiting-approve")
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.procurementRequestWaitingApproveCount = data;
        }
        else {
          console.log('getCountRequestsWaitingApprove(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getCountRequestsWaitingApprove().err: ' + err);
        });
  }

  getCountRequestsWaitingRFQ() {
    this.procurementRequestService.getCountByStateId("approved")
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.procurementRequestWaitingRFQCount = data;
        }
        else {
          console.log('getCountRequestsWaitingRFQ(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getCountRequestsWaitingRFQ().err: ' + err);
        });
  }

  getCountRequestsWaitingBid() {
    this.procurementRequestService.getCountByStateId("waiting-rfq-bid")
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.procurementRequestWaitingBidCount = data;
        }
        else {
          console.log('getCountRequestsWaitingBid(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getCountRequestsWaitingBid().err: ' + err);
        });
  }

  getCountPurchaseOrderItemsWaitingDelivery() {
    this.procurementPurchaseOrderItemService.getCountByStateId("po-given")
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.purchaseOrderItemWaitingDeliveryCount = data;
        }
        else {
          console.log('getCountPurchaseOrderItemsWaitingDelivery(): ' + httpServiceResult);
        }
      },
        (err) => {
          console.log('getCountPurchaseOrderItemsWaitingDelivery().err: ' + err);
        });
  }

  getCustomerCount() {
    this.partyService.getCustomerCount()
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.salesModuleCustomerCount = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  getCustomerInteractionCount() {
    this.salesCustomerMeetingFormService.getCount()
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.salesModuleCustomerInteractionCount = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  getSalesOfferCount() {
    let qo: QueryOptions = new QueryOptions();

    let fromDateStr: string = moment().utc().local().format("YYYY") + '-01-01 00:00:00';
    let toDateStr: string = moment().utc().local().format("YYYY-MM-DD") + ' 00:00:00';

    this.salesOfferService.getCount(null, fromDateStr, toDateStr, qo)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.salesModuleSalesOfferCount = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  getOfferToOrderRatio() {
    return this.salesModuleSalesOfferCount == 0 ? 0 : Math.round((this.salesModuleSalesOfferStateOrderCount / this.salesModuleSalesOfferCount) * 100);
  }

  getSalesOfferStateOrderCount() {
    let qo: QueryOptions = new QueryOptions();

    let fromDateStr: string = moment().utc().local().format("YYYY") + '-01-01 00:00:00';
    let toDateStr: string = moment().utc().local().format("YYYY-MM-DD");

    this.salesOrderService.getCount(null, fromDateStr, toDateStr, qo)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.salesModuleSalesOfferStateOrderCount = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  // Company Wide Revenue Totals in USD
  // Horizontal Bar Chart ThisYearUntilAllTotalsUSD
  barChartDataThisYearUntilAllTotalsUSD: any[] = null;
  barChartLabelsThisYearUntilAllTotalsUSD: string[] = ['Ürünler (İsk.)', 'Statik Hes.', 'Nakliye', 'De-Montaj', 'Montaj', 'İskonto', 'Toplam']; // #87cefa
  barChartColorsThisYearUntilAllTotalsUSD: any[] = [{
    backgroundColor: ['#4caf50', '#3f51b5', '#ffb822', '#ffeb3b', '#9c27b0', '#f44336', '#87cefa'],
    borderColor: ['#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5']
  }];
  barChartHorizontalTypeThisYearUntilAllTotalsUSD = 'horizontalBar';
  barChartHorizontalOptionsThisYearUntilAllTotalsUSD: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'left'
    },
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }]
    }
  };

  // Company Wide Revenue Monthly in USD
  // Horizontal Bar Chart ThisYearUntilAllMonthlyUSD
  barChartDataThisYearUntilAllMonthlyUSD: any[] = null;
  barChartLabelsThisYearUntilAllMonthlyUSD: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; // months
  barChartColorsThisYearUntilAllMonthlyUSD: any[] = [{ // grey
    backgroundColor: '#4caf50', // urunler
    borderColor: '#3f51b5',
    pointBackgroundColor: '#3f51b5',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#3f51b5', // statik hesap
    borderColor: '#e0e0e0',
    pointBackgroundColor: '#e0e0e0',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, {
    backgroundColor: '#ffb822', // nakliye
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#ffeb3b', // De-Montaj
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#9c27b0', // Montaj
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#87cefa', // Toplam
    borderColor: '#3f51b5',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  barChartHorizontalTypeThisYearUntilAllMonthlyUSD = 'bar';
  barChartHorizontalOptionsThisYearUntilAllMonthlyUSD: any = null;
  //barChartHorizontalOptionsThisYearUntilAllMonthlyUSD: any = {
  //  responsive: true,
  //  tooltips: {
  //    mode: 'index',
  //    intersect: false
  //  },
  //  legend: {
  //    display: false,
  //    position: 'left'
  //  },
  //  scaleShowVerticalLines: true,
  //  scales: {
  //    xAxes: [{
  //      gridLines: {
  //        color: 'rgba(0,0,0,0.02)',
  //        zeroLineColor: 'rgba(0,0,0,0.02)'
  //      },
  //      stacked: true,
  //      ticks: {
  //        beginAtZero: true
  //      }
  //    }],
  //    yAxes: [{
  //      gridLines: {
  //        color: 'rgba(0,0,0,0.02)',
  //        zeroLineColor: 'rgba(0,0,0,0.02)'
  //      },
  //      stacked: true
  //    }]
  //  }
  //};

  // SalesPerson based Revenues in USD
  // Horizontal Bar Chart ThisYearUntilSalesPersonBasedTotalsUSD
  barChartDataThisYearUntilSalesPersonBasedTotalsUSD: any[] = null;
  barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD: string[] = []; // add dynamically names for each SalesPerson
  barChartColorsThisYearUntilSalesPersonBasedTotalsUSD: any[] = [{
    backgroundColor: [], // add dynamically colors for each SalesPerson
    borderColor: []  // add dynamically colors for each SalesPerson
  }];
  barChartHorizontalTypeThisYearUntilSalesPersonBasedTotalsUSD = 'horizontalBar';
  barChartHorizontalOptionsThisYearUntilSalesPersonBasedTotalsUSD: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'left'
    },
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }]
    }
  };

  // SalesPerson based Counts
  // Horizontal Bar Chart ThisYearUntilSalesPersonBasedTotalsCount
  barChartDataThisYearUntilSalesPersonBasedTotalsCount: any[] = null;
  barChartLabelsThisYearUntilSalesPersonBasedTotalsCount: string[] = []; // add dynamically names for each SalesPerson
  barChartColorsThisYearUntilSalesPersonBasedTotalsCount: any[] = [{
    backgroundColor: [], // add dynamically colors for each SalesPerson
    borderColor: []  // add dynamically colors for each SalesPerson
  }];
  barChartHorizontalTypeThisYearUntilSalesPersonBasedTotalsCount = 'horizontalBar';
  barChartHorizontalOptionsThisYearUntilSalesPersonBasedTotalsCount: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'left'
    },
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }]
    }
  };

  // Single SalesPeron Revenue Totals in USD
  // Horizontal Bar Chart ThisYearUntilAllTotalsUSD
  barChartDataThisYearUntilMyTotalsUSD: any[] = null;
  barChartLabelsThisYearUntilMyTotalsUSD: string[] = ['Ürünler (İsk.)', 'Statik Hes.', 'Nakliye', 'De-Montaj', 'Montaj', 'İskonto', 'Toplam']; // #87cefa
  barChartColorsThisYearUntilMyTotalsUSD: any[] = [{
    backgroundColor: ['#4caf50', '#3f51b5', '#ffb822', '#ffeb3b', '#9c27b0', '#f44336', '#87cefa'],
    borderColor: ['#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5']
  }];
  barChartHorizontalTypeThisYearUntilMyTotalsUSD = 'horizontalBar';
  barChartHorizontalOptionsThisYearUntilMyTotalsUSD: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'left'
    },
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }]
    }
  };

  // Single SalesPerson Revenue Monthly in USD
  // Horizontal Bar Chart ThisYearUntilMyMonthlyUSD
  barChartDataThisYearUntilMyMonthlyUSD: any[] = null;
  barChartLabelsThisYearUntilMyMonthlyUSD: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; // months
  barChartColorsThisYearUntilMyMonthlyUSD: any[] = [{ // grey
    backgroundColor: '#4caf50', // urunler
    borderColor: '#3f51b5',
    pointBackgroundColor: '#3f51b5',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#3f51b5', // statik hesap
    borderColor: '#e0e0e0',
    pointBackgroundColor: '#e0e0e0',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, {
    backgroundColor: '#ffb822', // nakliye
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#ffeb3b', // De-Montaj
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#9c27b0', // Montaj
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  barChartHorizontalTypeThisYearUntilMyMonthlyUSD = 'bar';
  barChartHorizontalOptionsThisYearUntilMyMonthlyUSD: any = {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false
    },
    legend: {
      display: false,
      position: 'left'
    },
    scaleShowVerticalLines: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        stacked: true
      }]
    }
  };

  salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson: SalesReportGroupedSalesPerformanceData[] = [];

  priceTotalUSD: number = 0;

  countSalesOrderTotal: number = 0;
  countSalesOrderCanceledTotal: number = 0;
  countSalesOrderRevisionTotal: number = 0;

  // Company Wide Revenue Totals in USD
  priceProductServiceTotalUSD: number = 0;
  priceProductServiceWithDiscountTotalUSD: number = 0;
  priceStaticCalculationTotalUSD: number = 0;
  priceShipmentTotalUSD: number = 0;
  priceUnInstallationTotalUSD: number = 0;
  priceInstallationTotalUSD: number = 0;
  priceDiscountTotalUSD: number = 0;

  // Company Wide Revenue Monthly in USD
  priceProductServiceAllMonthlyUSD: number[] = [];
  priceProductServiceWithDiscountAllMonthlyUSD: number[] = [];
  priceStaticCalculationAllMonthlyUSD: number[] = [];
  priceShipmentAllMonthlyUSD: number[] = [];
  priceUnInstallationAllMonthlyUSD: number[] = [];
  priceInstallationAllMonthlyUSD: number[] = [];
  priceDiscountAllMonthlyUSD: number[] = [];
  priceTotalAllMonthlyUSD: number[] = [];

  // SalesPerson based Revenues in USD
  priceProductServiceSalesPersonBasedTotalsUSD: number[] = [];
  priceProductServiceWithDiscountSalesPersonBasedTotalsUSD: number[] = [];
  priceStaticCalculationSalesPersonBasedTotalsUSD: number[] = [];
  priceShipmentSalesPersonBasedTotalsUSD: number[] = [];
  priceUnInstSalesPersonationSalesPersonBasedTotalsUSD: number[] = [];
  priceInstSalesPersonationSalesPersonBasedTotalsUSD: number[] = [];
  priceDiscountSalesPersonBasedTotalsUSD: number[] = [];
  priceTotalSalesPersonBasedTotalsUSD: number[] = [];

  // SalesPerson based Counts
  countSalesOrderSalesPersonBasedTotalsCount: number[] = [];

  // Company Wide Revenue Totals in USD
  priceProductServiceMyTotalsUSD: number = 0;
  priceProductServiceWithDiscountMyTotalsUSD: number = 0;
  priceStaticCalculationMyTotalsUSD: number = 0;
  priceShipmentMyTotalsUSD: number = 0;
  priceUnInstallationMyTotalsUSD: number = 0;
  priceInstallationMyTotalsUSD: number = 0;
  priceDiscountMyTotalsUSD: number = 0;
  priceTotalMyTotalUSD: number = 0;

  // Single SalesPerson Revenue Monthly in USD
  priceProductServiceMyMonthlyUSD: number[] = [];
  priceProductServiceWithDiscountMyMonthlyUSD: number[] = [];
  priceStaticCalculationMyMonthlyUSD: number[] = [];
  priceShipmentMyMonthlyUSD: number[] = [];
  priceUnInstallationMyMonthlyUSD: number[] = [];
  priceInstallationMyMonthlyUSD: number[] = [];
  priceDiscountMyMonthlyUSD: number[] = [];
  priceTotalMyMonthlyUSD: number[] = [];
  priceTotalMyUSD: number = 0;

  getPriceTotalUSD() {
    return this.valueFormatterService.toDecimalNumberStringFromFloat(this.priceTotalUSD, 0);
  }

  getCountSalesOrderCanceledTotal() {
    return this.countSalesOrderCanceledTotal;
  }

  getCountSalesOrderRevisionTotal() {
    return this.countSalesOrderRevisionTotal;
  }

  isReadyBarChartDataThisYearUntilAllTotalsUSD() {
    return this.barChartDataThisYearUntilAllTotalsUSD != null;
  }

  createCurrencyParities() {
    console.log("moment now: ", moment().utc().local().format());

    // until yesterday
    let toYYYYdashMMdashdd: string = moment().utc().local().subtract(1, "days").format("YYYY-MM-DD");

    this.salesOrderService.createCurrencyParities("2018-01-01", toYYYYdashMMdashdd)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: any[] = httpServiceResult.result.data;

          console.log("toYYYYdashMMdashdd: " + toYYYYdashMMdashdd, data);
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  checkAndCreateCurrencyParitiesYesterday() {
    console.log("moment now: ", moment().utc().local().format());

    let YYYYdashMMdashdd: string = moment().utc().local().subtract(1, "days").format("YYYY-MM-DD");

    this.salesOrderService.getCurrencyParities(YYYYdashMMdashdd)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: any[] = httpServiceResult.result.data;

          console.log("YYYYdashMMdashdd: " + YYYYdashMMdashdd, data);
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  getSalesReportSalesPersonSalesPerformanceData() {
    console.log("moment now: ", moment().utc().local().format());

    let fromDateStr: string = moment().utc().local().format("YYYY") + '-01-01 00:00:00';
    let toDateStr: string = moment().utc().local().format("YYYY-MM-DD") + ' 00:00:00';

    this.salesOrderService.getSalesReportGroupedSalesPerformanceDataBetweenDatesByYearMonthSalesPerson(fromDateStr, toDateStr)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: SalesReportGroupedSalesPerformanceData[] = httpServiceResult.result.data;

          this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson = data;

          this.prepareCountsTotal();

          this.prepareBarChartDataThisYearUntilAllTotalsUSD();

          this.prepareBarChartDataThisYearUntilAllMonthlyUSD();

          this.prepareBarChartDataThisYearUntilSalesPersonBasedTotalsUSD();

          this.prepareBarChartDataThisYearUntilSalesPersonBasedTotalsCount();

          this.prepareBarChartDataThisYearUntilMyTotalsUSD();

          this.prepareBarChartDataThisYearUntilMyMonthlyUSD();
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  prepareCountsTotal() {
    this.countSalesOrderCanceledTotal = 0;
    this.countSalesOrderRevisionTotal = 0;

    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      this.countSalesOrderCanceledTotal += salesOrderPerformanceDataRow.countSalesOrderCanceled;
      this.countSalesOrderRevisionTotal += salesOrderPerformanceDataRow.countSalesOrderRevision;
    }
  }

  prepareBarChartDataThisYearUntilAllTotalsUSD() {
    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      this.priceProductServiceTotalUSD += salesOrderPerformanceDataRow.priceProductServiceTotalUSD;
      this.priceProductServiceWithDiscountTotalUSD += salesOrderPerformanceDataRow.priceProductServiceTotalUSD - salesOrderPerformanceDataRow.priceDiscountUSD;
      this.priceStaticCalculationTotalUSD += salesOrderPerformanceDataRow.priceStaticCalculationUSD;
      this.priceShipmentTotalUSD += salesOrderPerformanceDataRow.priceShipmentUSD;
      this.priceUnInstallationTotalUSD += salesOrderPerformanceDataRow.priceUnInstallationUSD;
      this.priceInstallationTotalUSD += salesOrderPerformanceDataRow.priceInstallationUSD;
      this.priceDiscountTotalUSD += salesOrderPerformanceDataRow.priceDiscountUSD;
      this.priceTotalUSD += salesOrderPerformanceDataRow.priceTotalUSD;
    }

    this.barChartDataThisYearUntilAllTotalsUSD = [{
      data: [
        Math.round(this.priceProductServiceWithDiscountTotalUSD),
        Math.round(this.priceStaticCalculationTotalUSD),
        Math.round(this.priceShipmentTotalUSD),
        Math.round(this.priceUnInstallationTotalUSD),
        Math.round(this.priceInstallationTotalUSD),
        Math.round(this.priceDiscountTotalUSD),
        Math.round(this.priceTotalUSD)
      ],
      borderWidth: 1
    }];
  }

  prepareBarChartDataThisYearUntilAllMonthlyUSD() {
    this.priceProductServiceAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceProductServiceWithDiscountAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceStaticCalculationAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceShipmentAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceUnInstallationAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceInstallationAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceDiscountAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceTotalAllMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      let month: number = salesOrderPerformanceDataRow.month;

      this.priceProductServiceAllMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceProductServiceTotalUSD);
      this.priceProductServiceWithDiscountAllMonthlyUSD[month - 1] += Math.round((salesOrderPerformanceDataRow.priceProductServiceTotalUSD - salesOrderPerformanceDataRow.priceDiscountUSD));
      this.priceStaticCalculationAllMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceStaticCalculationUSD);
      this.priceShipmentAllMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceShipmentUSD);
      this.priceUnInstallationAllMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceUnInstallationUSD);
      this.priceInstallationAllMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceInstallationUSD);
      this.priceDiscountAllMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceDiscountUSD);
      this.priceTotalAllMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceTotalUSD);
    }

    this.barChartDataThisYearUntilAllMonthlyUSD = [{
      data: this.priceProductServiceWithDiscountAllMonthlyUSD,
      label: 'İskontolu Ürünler',
      borderWidth: 1
    }, {
      data: this.priceStaticCalculationAllMonthlyUSD,
      label: 'Statik Hes.',
      borderWidth: 1
    }
      , {
      data: this.priceShipmentAllMonthlyUSD,
      label: 'Nakliye',
      borderWidth: 1
    }
      , {
      data: this.priceUnInstallationAllMonthlyUSD,
      label: 'De-Montaj',
      borderWidth: 1
    }, {
      data: this.priceInstallationAllMonthlyUSD,
      label: 'Montaj',
      borderWidth: 1
    }, {
      data: this.priceTotalAllMonthlyUSD,
      label: 'Toplam',
      borderWidth: 1
    }];
  }

  prepareBarChartDataThisYearUntilSalesPersonBasedTotalsUSD() {
    // for each SalesPerson, add a label and a color
    this.barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD = [];
    this.barChartColorsThisYearUntilSalesPersonBasedTotalsUSD = [{
      backgroundColor: [], // add dynamically colors for each SalesPerson
      borderColor: []  // add dynamically colors for each SalesPerson
    }];
    // for each SalesPerson, add a label and a color
    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      let salesPersonNameExists: boolean = false;
      for (let j = 0; j < this.barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD.length; ++j) {
        if (salesOrderPerformanceDataRow.group1Name == this.barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD[j]) {
          salesPersonNameExists = true;
          break;
        }
      }
      if (!salesPersonNameExists) {
        // for each SalesPerson add name as a label
        this.barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD.push(salesOrderPerformanceDataRow.group1Name);
        // for each SalesPerson add a color
        this.barChartColorsThisYearUntilSalesPersonBasedTotalsUSD[0].backgroundColor.push('#abcd12');
        this.barChartColorsThisYearUntilSalesPersonBasedTotalsUSD[0].borderColor.push('#abcd23');

        // for each SalesPerson, push zero
        this.priceProductServiceSalesPersonBasedTotalsUSD.push(0);
        this.priceProductServiceWithDiscountSalesPersonBasedTotalsUSD.push(0);
        this.priceStaticCalculationSalesPersonBasedTotalsUSD.push(0);
        this.priceShipmentSalesPersonBasedTotalsUSD.push(0);
        this.priceUnInstSalesPersonationSalesPersonBasedTotalsUSD.push(0);
        this.priceInstSalesPersonationSalesPersonBasedTotalsUSD.push(0);
        this.priceDiscountSalesPersonBasedTotalsUSD.push(0);
        this.priceTotalSalesPersonBasedTotalsUSD.push(0);
      }
    }

    // sort by name of SalesPerson
    this.barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD.sort((a, b) => {
      if (a < b) { return -1; }
      else if (a > b) { return 1; }
      else { return 0; }
    });

    // calculate totals based on SalesPerson
    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      let salesPersonNameExists: boolean = false;
      for (let j = 0; j < this.barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD.length; ++j) {
        if (salesOrderPerformanceDataRow.group1Name == this.barChartLabelsThisYearUntilSalesPersonBasedTotalsUSD[j]) {

          this.priceProductServiceSalesPersonBasedTotalsUSD[j] += salesOrderPerformanceDataRow.priceProductServiceTotalUSD;
          this.priceProductServiceWithDiscountSalesPersonBasedTotalsUSD[j] += salesOrderPerformanceDataRow.priceProductServiceTotalUSD - salesOrderPerformanceDataRow.priceDiscountUSD;
          this.priceStaticCalculationSalesPersonBasedTotalsUSD[j] += salesOrderPerformanceDataRow.priceStaticCalculationUSD;
          this.priceShipmentSalesPersonBasedTotalsUSD[j] += salesOrderPerformanceDataRow.priceShipmentUSD;
          this.priceUnInstSalesPersonationSalesPersonBasedTotalsUSD[j] += salesOrderPerformanceDataRow.priceUnInstallationUSD;
          this.priceInstSalesPersonationSalesPersonBasedTotalsUSD[j] += salesOrderPerformanceDataRow.priceInstallationUSD;
          this.priceDiscountSalesPersonBasedTotalsUSD[j] += salesOrderPerformanceDataRow.priceDiscountUSD;
          this.priceTotalSalesPersonBasedTotalsUSD[j] += Math.round(salesOrderPerformanceDataRow.priceTotalUSD);
        }
      }
    }

    this.barChartDataThisYearUntilSalesPersonBasedTotalsUSD = [{
      data: this.priceTotalSalesPersonBasedTotalsUSD,
      borderWidth: 1
    }];
  }

  prepareBarChartDataThisYearUntilSalesPersonBasedTotalsCount() {
    // for each SalesPerson, add a label and a color
    this.barChartLabelsThisYearUntilSalesPersonBasedTotalsCount = [];
    this.barChartColorsThisYearUntilSalesPersonBasedTotalsCount = [{
      backgroundColor: [], // add dynamically colors for each SalesPerson
      borderColor: []  // add dynamically colors for each SalesPerson
    }];
    // for each SalesPerson, add a label and a color
    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      let salesPersonNameExists: boolean = false;
      for (let j = 0; j < this.barChartLabelsThisYearUntilSalesPersonBasedTotalsCount.length; ++j) {
        if (salesOrderPerformanceDataRow.group1Name == this.barChartLabelsThisYearUntilSalesPersonBasedTotalsCount[j]) {
          salesPersonNameExists = true;
          break;
        }
      }
      if (!salesPersonNameExists) {
        // for each SalesPerson add name as a label
        this.barChartLabelsThisYearUntilSalesPersonBasedTotalsCount.push(salesOrderPerformanceDataRow.group1Name);
        // for each SalesPerson add a color
        this.barChartColorsThisYearUntilSalesPersonBasedTotalsCount[0].backgroundColor.push('#abcd12');
        this.barChartColorsThisYearUntilSalesPersonBasedTotalsCount[0].borderColor.push('#abcd23');

        // for each SalesPerson, push zero
        this.countSalesOrderSalesPersonBasedTotalsCount.push(0);
      }
    }

    // sort by name of SalesPerson
    this.barChartLabelsThisYearUntilSalesPersonBasedTotalsCount.sort((a, b) => {
      if (a < b) { return -1; }
      else if (a > b) { return 1; }
      else { return 0; }
    });

    // calculate totals based on SalesPerson
    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      let salesPersonNameExists: boolean = false;
      for (let j = 0; j < this.barChartLabelsThisYearUntilSalesPersonBasedTotalsCount.length; ++j) {
        if (salesOrderPerformanceDataRow.group1Name == this.barChartLabelsThisYearUntilSalesPersonBasedTotalsCount[j]) {

          this.countSalesOrderSalesPersonBasedTotalsCount[j] += salesOrderPerformanceDataRow.countSalesOrder;
        }
      }
    }

    this.barChartDataThisYearUntilSalesPersonBasedTotalsCount = [{
      data: this.countSalesOrderSalesPersonBasedTotalsCount,
      borderWidth: 1
    }];
  }

  prepareBarChartDataThisYearUntilMyTotalsUSD() {
    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      if (salesOrderPerformanceDataRow.group1Id == this.authService.getUserId()) {
        this.priceProductServiceMyTotalsUSD += salesOrderPerformanceDataRow.priceProductServiceTotalUSD;
        this.priceProductServiceWithDiscountMyTotalsUSD += salesOrderPerformanceDataRow.priceProductServiceTotalUSD - salesOrderPerformanceDataRow.priceDiscountUSD;
        this.priceStaticCalculationMyTotalsUSD += salesOrderPerformanceDataRow.priceStaticCalculationUSD;
        this.priceShipmentMyTotalsUSD += salesOrderPerformanceDataRow.priceShipmentUSD;
        this.priceUnInstallationMyTotalsUSD += salesOrderPerformanceDataRow.priceUnInstallationUSD;
        this.priceInstallationMyTotalsUSD += salesOrderPerformanceDataRow.priceInstallationUSD;
        this.priceDiscountMyTotalsUSD += salesOrderPerformanceDataRow.priceDiscountUSD;
        this.priceTotalMyTotalUSD += salesOrderPerformanceDataRow.priceTotalUSD;
      }
    }

    this.barChartDataThisYearUntilMyTotalsUSD = [{
      data: [
        Math.round(this.priceProductServiceWithDiscountMyTotalsUSD),
        Math.round(this.priceStaticCalculationMyTotalsUSD),
        Math.round(this.priceShipmentMyTotalsUSD),
        Math.round(this.priceUnInstallationMyTotalsUSD),
        Math.round(this.priceInstallationMyTotalsUSD),
        Math.round(this.priceDiscountMyTotalsUSD),
        Math.round(this.priceTotalMyTotalUSD)
      ],
      borderWidth: 1
    }];
  }

  prepareBarChartDataThisYearUntilMyMonthlyUSD() {
    this.priceProductServiceMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceProductServiceWithDiscountMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceStaticCalculationMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceShipmentMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceUnInstallationMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceInstallationMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceDiscountMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.priceTotalMyMonthlyUSD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson.length; ++i) {
      let salesOrderPerformanceDataRow: SalesReportGroupedSalesPerformanceData = this.salesOrderPerformanceDataRowsGroupedByYearMonthSalesPerson[i];

      if (salesOrderPerformanceDataRow.group1Id == this.authService.getUserId()) {
        let month: number = salesOrderPerformanceDataRow.month;

        this.priceProductServiceMyMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceProductServiceTotalUSD);
        this.priceProductServiceWithDiscountMyMonthlyUSD[month - 1] += Math.round((salesOrderPerformanceDataRow.priceProductServiceTotalUSD - salesOrderPerformanceDataRow.priceDiscountUSD));
        this.priceStaticCalculationMyMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceStaticCalculationUSD);
        this.priceShipmentMyMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceShipmentUSD);
        this.priceUnInstallationMyMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceUnInstallationUSD);
        this.priceInstallationMyMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceInstallationUSD);
        this.priceDiscountMyMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceDiscountUSD);
        this.priceTotalMyMonthlyUSD[month - 1] += Math.round(salesOrderPerformanceDataRow.priceTotalUSD);

        this.priceTotalMyUSD += Math.round(salesOrderPerformanceDataRow.priceTotalUSD);
      }
    }

    this.barChartDataThisYearUntilMyMonthlyUSD = [{
      data: this.priceProductServiceWithDiscountMyMonthlyUSD,
      label: 'İskontolu Ürünler',
      borderWidth: 1
    }, {
      data: this.priceStaticCalculationMyMonthlyUSD,
      label: 'Statik Hes.',
      borderWidth: 1
    }
      , {
      data: this.priceShipmentMyMonthlyUSD,
      label: 'Nakliye',
      borderWidth: 1
    }
      , {
      data: this.priceUnInstallationMyMonthlyUSD,
      label: 'De-Montaj',
      borderWidth: 1
    }, {
      data: this.priceInstallationMyMonthlyUSD,
      label: 'Montaj',
      borderWidth: 1
    }];
  }

  getAccountingETACurrentBalances() {
    this.accountingETACurrentBalances = [];

    this.accountingETACurrentBalanceService.getList()
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: AccountingETACurrentBalance[] = httpServiceResult.result.data;

          this.accountingETACurrentBalances = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }
}
