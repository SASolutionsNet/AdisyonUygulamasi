import { Component, Injectable, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { FileUploader, FileItem, FileLikeObject, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
import * as moment from 'moment';
import 'moment/locale/tr';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ErrorDialogComponent } from '../../../../shared/modules/errordialog/errordialog.component';

import { environment } from '../../../../../environments/environment';

import { UnitService } from '../../../../shared/modules/unit/unit.service';
import { CountryService } from '../../../../shared/modules/country/country.service';

import { ValueFormatterService } from '../../../../shared/modules/common/value.formatter.service';

import { Party, RelationPartyQASCertificate, PartyService } from '../../../../shared/modules/party/party.service';
import { ProcurementRFQBid, ProcurementRFQBidItem, ProcurementRFQService } from '../../../../shared/modules/procurement/rfq/procurementrfq.service';
import { ProcurementPurchaseOrder, ProcurementPurchaseOrderService } from '../../../../shared/modules/procurement/purchaseorder/purchaseorder.service';
import { ProcurementPurchaseOrderItem } from '../../../../shared/modules/procurement/purchaseorderitem/models/purchaseorderitem.model';

@Component({
  selector: 'app-public-procurement-po-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class PublicProcurementPurchaseOrderViewComponent implements OnInit {

  public isActionButtonOneDisabledCallback: Function;

  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;

  procurementPurchaseOrderId: string;
  procurementPurchaseOrder: ProcurementPurchaseOrder;
  procurementRFQBid: ProcurementRFQBid = null;
  procurementRFQBidClone: any;
  private subscribedParameter: any;

  datePickerTouch: boolean = true;
  datePickerFilterOdd: boolean = false;
  datePickerYearView: boolean = false;
  datePickerMinDate: Date;
  datePickerMaxDate: Date;
  datePickerStartDate: Date;
  datePickerDateFilter = null; //(date: Date) => date.getMonth() % 2 == 1 && date.getDate() % 2 == 0;

  rows = [];
  selected = [];

  rowsQASCertificate = [];
  selectedQASCertificate = [];
  filteredRowsQASCertificate = [];
  busyQASCertificate: boolean = true;
  listQASCertificate: RelationPartyQASCertificate[] = [];
  columnsQASCertificate = [];

  uploaderQASCertificate: FileUploader;
  uploaderRFQBidDocument: FileUploader;
  fileUploadErrorMesssage: string = null;

  public isTermsAccepted: boolean = false;
  public isRFQBidSavedAndSent: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private unitService: UnitService,
    private countryService: CountryService,
    private valueFormatterService: ValueFormatterService,
    private partyService: PartyService,
    private procurementRFQService: ProcurementRFQService,
    private procurementPurchaseOrderService: ProcurementPurchaseOrderService) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    this.datePickerMinDate = moment().utc().add(1, 'd').local().toDate();
    this.datePickerStartDate = this.datePickerMinDate;
  }

  ngOnInit() {
    this.isActionButtonOneDisabledCallback = this.isActionButtonOneDisabled.bind(this);

    this.subscribedParameter = this.activatedRoute.params.subscribe(params => {
      this.procurementPurchaseOrderId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.getProcurementPurchaseOrder();
    });
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  isPurchaseOrderStateOk() {
    return (this.procurementPurchaseOrder.stateId == 'po-given');
  }

  isPayAfterOrderPricingVisible() {
    return this.procurementRFQBid.paymentModelType == 'pay-custom-plan' || this.procurementRFQBid.paymentModelType == 'pay-partial-later';
  }

  isPayAfterInvoicePricingVisible() {
    return this.procurementRFQBid.paymentModelType == 'pay-custom-plan';
  }

  isPayAfterDeliveryPricingVisible() {
    return this.procurementRFQBid.paymentModelType == 'pay-custom-plan' || this.procurementRFQBid.paymentModelType == 'pay-partial-later';
  }

  isMilestoneBasedPricingVisible() {
    return this.procurementRFQBid.paymentModelType == 'pay-custom-plan' || this.procurementRFQBid.paymentModelType == 'pay-milestone-based';
  }

  isInstallmentBasedPricingVisible() {
    return this.procurementRFQBid.paymentModelType == 'pay-custom-plan' || this.procurementRFQBid.paymentModelType == 'pay-installment';
  }

  isActionButtonOneDisabled(row: ProcurementPurchaseOrderItem) {
    return false;
  }

  onActionButtonOneClicked(row) {
    // http://www.concretepage.com/angular-2/angular-2-routing-and-navigation-example
    this.router.navigate(['/public/procurement/request/media/list/' + row.procurementRequestId]);
  }

  navigateToProcurementRequestMediaList(row) {
    // http://www.concretepage.com/angular-2/angular-2-routing-and-navigation-example
    this.router.navigate(['/public/procurement/request/media/list/' + row.procurementRequestId]);
  }

  hasRFQBidDocument() {
    return this.procurementRFQBid != null ? (this.procurementRFQBid.documentName != null) : false;
  }

  getRFQBidDocument() {
    this.procurementRFQService.getRFQBidDocument(this.procurementRFQBid.supplierId, this.procurementRFQBid.id, this.procurementRFQBid.documentName);
  }

  getQASCertificateDocument(row) {
    this.partyService.getQASCertificateDocument(this.procurementRFQBid.supplierId, row.id, row.name);
  }

  hasPurchaseOrderDocument() {
    return this.procurementRFQBid != null ? (this.procurementRFQBid.documentName != null) : false;
  }

  getPurchaseOrderDocument() {
    this.procurementRFQService.getRFQBidDocument(this.procurementRFQBid.supplierId, this.procurementRFQBid.id, this.procurementRFQBid.documentName);
  }

  getQASCertificates() {
    this.partyService.getQASCertificates(this.procurementRFQBid.supplierId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: RelationPartyQASCertificate[] = httpServiceResult.result.data;

          this.listQASCertificate = data;
          this.rowsQASCertificate = data;
          this.filteredRowsQASCertificate = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }

        this.busyQASCertificate = false;
      },
      (err) => {
        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);

        this.busyQASCertificate = false;
      });
  }

  getProcurementPurchaseOrder() {
    this.procurementPurchaseOrderService.getById(this.procurementPurchaseOrderId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: ProcurementPurchaseOrder = httpServiceResult.result.data;

          this.procurementPurchaseOrder = data;

          this.procurementRFQBid = this.procurementPurchaseOrder.procurementRFQBid;

          this.procurementRFQBidClone = JSON.parse(JSON.stringify(this.procurementRFQBid));

          this.procurementRFQBidClone.validityDeadlineDate = this.procurementRFQBid.validityDeadlineDate ? moment.utc(this.procurementRFQBid.validityDeadlineDate).local().toDate() : this.datePickerMinDate;

          this.procurementRFQBidClone.priceShipment = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceShipment);
          this.procurementRFQBidClone.priceProductServiceTotal = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceProductServiceTotal);
          this.procurementRFQBidClone.priceDiscount = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceDiscount);
          this.procurementRFQBidClone.priceTotal = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceTotal);
          this.procurementRFQBidClone.paymentAfterOrderPrice = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentAfterOrderPrice);
          this.procurementRFQBidClone.paymentAfterInvoicePrice = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentAfterInvoicePrice);
          this.procurementRFQBidClone.paymentAfterDeliveryPrice = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentAfterDeliveryPrice);
          this.procurementRFQBidClone.paymentMilestonePrice = this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentMilestonePrice);

          let procurementPurchaseOrderItemClones: any[] = [];
          for (var i = 0; i < data.procurementPurchaseOrderItems.length; ++i) {
            let procurementPurchaseOrderItem = data.procurementPurchaseOrderItems[i];

            let procurementPurchaseOrderItemClone: any = JSON.parse(JSON.stringify(procurementPurchaseOrderItem));

            procurementPurchaseOrderItemClones.push(procurementPurchaseOrderItemClone);
          }

          this.rows = procurementPurchaseOrderItemClones;

          this.getQASCertificates();
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
