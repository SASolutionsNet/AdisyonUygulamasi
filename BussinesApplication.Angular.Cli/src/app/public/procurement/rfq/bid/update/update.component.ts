import { Component, Injectable, NgZone, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DateAdapter } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileUploader, FileItem, FileLikeObject, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as PerfectScrollbar from 'perfect-scrollbar';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
import * as moment from 'moment';
import 'moment/locale/tr';

import { ErrorDialogComponent } from '../../../../../shared/modules/errordialog/errordialog.component';

import { environment } from '../../../../../../environments/environment';

import { UnitService } from '../../../../../shared/modules/unit/unit.service';
import { CountryService } from '../../../../../shared/modules/country/country.service';

import { ValueFormatterService } from '../../../../../shared/modules/common/value.formatter.service';
import { ValidationError } from '../../../../../shared/modules/common/validationError';

import { Party, RelationPartyQASCertificate, PartyService } from '../../../../../shared/modules/party/party.service';
import { ProcurementRFQBid, ProcurementRFQBidItem, ProcurementRFQService } from '../../../../../shared/modules/procurement/rfq/procurementrfq.service';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-public-procurement-rfq-bid-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class PublicProcurementRFQBidUpdateComponent implements OnInit, OnDestroy, AfterViewInit {

  private _router: Subscription;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  url: string;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  currentLang = 'tr';
  dir = 'ltr';

  @ViewChild('root') root;

  public environment: any = null;

  procurementRFQBidId: string;
  procurementRFQBid: ProcurementRFQBid;
  private subscribedParameter: any;

  datePickerTouch: boolean = true;
  datePickerFilterOdd: boolean = false;
  datePickerYearView: boolean = false;
  datePickerMinDate: Date;
  datePickerMaxDate: Date;
  datePickerStartDate: Date;
  datePickerDateFilter = null; //(date: Date) => date.getMonth() % 2 == 1 && date.getDate() % 2 == 0;

  rows = [];
  editing = {};
  private isEditable: boolean = true;

  public form: FormGroup;

  rowsQASCertificate = [];
  selectedQASCertificate = [];

  uploaderQASCertificate: FileUploader;
  uploaderRFQBidDocument: FileUploader;
  fileUploadErrorMesssage: string = null;

  public isTermsAccepted: boolean = false;
  public isRFQBidSavedAndSent: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    zone: NgZone,
    private cdRef: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private unitService: UnitService,
    private countryService: CountryService,
    private valueFormatterService: ValueFormatterService,
    private partyService: PartyService,
    private procurementRFQService: ProcurementRFQService) {

    this.environment = environment;

    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    this.datePickerMinDate = moment().utc().add(1, 'd').local().toDate();
    this.datePickerStartDate = this.datePickerMinDate;

    this.form = this.fb.group({
      providerPersonFirstName: [null, Validators.compose([Validators.required, Validators.maxLength(64)])],
      providerPersonLastName: [null, Validators.compose([Validators.required, Validators.maxLength(64)])],
      providerPersonPosition: [null, Validators.compose([Validators.required, Validators.maxLength(64)])],
      providerPersonEmail: [null, Validators.compose([Validators.required, Validators.maxLength(256) /*, Validators.pattern('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')*/])],

      validityDeadlineDate: [this.datePickerMinDate, Validators.compose([Validators.required])],

      currency: ['TRY', Validators.compose([Validators.required])],

      priceShipment: [0, Validators.compose([Validators.required])],
      priceProductServiceTotal: [0, Validators.compose([Validators.required])],
      priceDiscount: [0, Validators.compose([Validators.required])],
      priceTotal: [0, Validators.compose([Validators.required])],
      paymentModelType: ["pay-partial-later", Validators.compose([Validators.maxLength(36)])],
      paymentMethodType: ["bank-wire", Validators.compose([Validators.maxLength(36)])],
      paymentAfterOrderPrice: [0, Validators.compose([Validators.required])],
      paymentAfterOrderDueDays: [0, Validators.compose([Validators.required])],
      paymentAfterInvoicePrice: [0, Validators.compose([Validators.required])],
      paymentAfterInvoiceDueDays: [0, Validators.compose([Validators.required])],
      paymentAfterDeliveryPrice: [0, Validators.compose([Validators.required])],
      paymentAfterDeliveryDueDays: [0, Validators.compose([Validators.required])],
      paymentInstallmentCount: [0, Validators.compose([Validators.required])],
      paymentInstallmentPeriodMonths: [0, Validators.compose([Validators.required])],
      paymentMilestoneCount: [0, Validators.compose([Validators.required])],
      paymentMilestonePrice: [0, Validators.compose([Validators.required])],
      paymentAfterMilestoneDeliveryDueDays: [0, Validators.compose([Validators.required])],

      descriptionRFQBid: [null, Validators.compose([Validators.maxLength(4096)])]
    });
  }

  ngOnChanges(): void {
  }

  ngOnInit() {
    this.subscribedParameter = this.activatedRoute.params.subscribe(params => {
      this.procurementRFQBidId = params['rfqBidId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.getRFQBid();
    });

    const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-drawer-content');

    if (this.mediaMatcher.matches && !this.isMac() && !this.compactSidebar) {
      PerfectScrollbar.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
      PerfectScrollbar.initialize(elemContent, { wheelSpeed: 2, suppressScrollX: true });
    }

    this.url = this.router.url;

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      document.querySelector('.app-inner .mat-drawer-content').scrollTop = 0;
      this.url = event.url;
      this.runOnRouteChange();
    });
  }

  ngAfterViewInit(): void {
    this.runOnRouteChange();
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.subscribedParameter) {
      this.subscribedParameter.unsubscribe();
    }
    if (this._router) {
      this._router.unsubscribe();
    }
  }

  runOnRouteChange(): void {
    if (this.mediaMatcher.matches && !this.isMac() && !this.compactSidebar) {
      const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-drawer-content');
      PerfectScrollbar.update(elemContent);
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  isRFQBidSent() {
    return this.isRFQBidSavedAndSent;
  }

  isRFQBidDeadlineOk() {
    return moment().utc().isBefore(moment.utc(this.procurementRFQBid.deadlineDateRFQBid));
  }

  isRFQBidStateOk() {
    return (this.procurementRFQBid.stateId == 'rfq-bid-given' || this.procurementRFQBid.stateId == 'waiting-rfq-bid');
  }

  isValid() {
    return this.form.valid && this.procurementRFQService.validateRFQBidItems(this.rows).isValid;
  }

  onPriceChanged(event) {
    var newValue = event.target.value;
    if ((newValue == null || newValue == undefined || newValue == '')) {
      newValue = '0';
    }
    event.target.value = newValue;

    this.updatePriceValues();
  }

  updateTableCellValue(event, cell, rowIndex, row) {
    let newValue = null;
    if (cell == 'deliveryDatePossible') {
      newValue = event;
    }
    else {
      newValue = event.target.value;

      if (cell == 'amountAvailable' || cell == 'unitPrice' || cell == 'taxPercent') {
        if ((newValue == null || newValue == undefined || newValue == '' || newValue.trim().length == 0)) {
          newValue = '0';
        }
      }
    }

    this.rows[rowIndex][cell] = newValue;
    this.rows = [...this.rows];

    console.log('UPDATED!', this.rows[rowIndex][cell]);
    console.log('UPDATED! row', row);

    this.updatePriceValues();
  }

  onCellEditingComplete(event, cell, rowIndex, row) {
    this.editing[rowIndex + '-' + cell] = false;
    this.updateTableCellValue(event, cell, rowIndex, row);
  }

  updatePriceValues() {
    var priceShipment: number = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['priceShipment'].value);
    var priceDiscount: number = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['priceDiscount'].value);
    var priceProductServiceTotal: number = 0;
    for (var i = 0; i < this.rows.length; ++i) {
      var rfqBidItem = this.rows[i];
      var rfqBidItemUnitPrice: number = this.valueFormatterService.parseDoubleValueFromTrString(rfqBidItem.unitPrice);
      var rfqBidItemAmountAvailable: number = this.valueFormatterService.parseDoubleValueFromTrString(rfqBidItem.amountAvailable);
      var rfqBidItemTaxPercent: number = this.valueFormatterService.parseDoubleValueFromTrString(rfqBidItem.taxPercent);

      var rfqBidItemPriceTotal = rfqBidItemAmountAvailable * rfqBidItemUnitPrice;

      priceProductServiceTotal += rfqBidItemPriceTotal;
    }
    var priceTotal: number = priceShipment + priceProductServiceTotal - priceDiscount;

    this.form.patchValue({
      priceProductServiceTotal: this.valueFormatterService.toDecimalNumberStringFromFloat(priceProductServiceTotal),
      priceTotal: this.valueFormatterService.toDecimalNumberStringFromFloat(priceTotal)
    });
  }

  showCurrencyCodeISO3() {
    // since mat-select change does not work, we have to update table column headers like this:
    return this.form.controls['currency'].value;
  }

  checkboxChechedChanged(checked: boolean) {
    this.isTermsAccepted = checked;
  }

  isPayAfterOrderPricingVisible() {
    return this.form.controls['paymentModelType'].value == 'pay-custom-plan' || this.form.controls['paymentModelType'].value == 'pay-partial-later';
  }

  isPayAfterInvoicePricingVisible() {
    return this.form.controls['paymentModelType'].value == 'pay-custom-plan';
  }

  isPayAfterDeliveryPricingVisible() {
    return this.form.controls['paymentModelType'].value == 'pay-custom-plan' || this.form.controls['paymentModelType'].value == 'pay-partial-later';
  }

  isMilestoneBasedPricingVisible() {
    return this.form.controls['paymentModelType'].value == 'pay-custom-plan' || this.form.controls['paymentModelType'].value == 'pay-milestone-based';
  }

  isInstallmentBasedPricingVisible() {
    return this.form.controls['paymentModelType'].value == 'pay-custom-plan' || this.form.controls['paymentModelType'].value == 'pay-installment';
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
    switch (filter.name) {
      case 'fileSize':
        this.fileUploadErrorMesssage = "Maksimum dosya boyutu en fazla 10 MB olabilir";
        break;
      case 'mimeType':
        this.fileUploadErrorMesssage = "Sadece jpg, jpeg, png, pdf tipinde dosya olmalı";
        break;
      default:
        this.fileUploadErrorMesssage = "Dosya yüklemede hata oluştu";
        break;
    }
  }

  getRFQBid() {
    this.procurementRFQService.getRFQBidById(this.procurementRFQBidId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: ProcurementRFQBid = httpServiceResult.result.data;

          this.procurementRFQBid = data;

          this.form.patchValue({
            providerPersonFirstName: this.procurementRFQBid.providerPersonFirstName,
            providerPersonLastName: this.procurementRFQBid.providerPersonLastName,
            providerPersonPosition: this.procurementRFQBid.providerPersonPosition,
            providerPersonEmail: this.procurementRFQBid.providerPersonEmail,

            validityDeadlineDate: this.procurementRFQBid.validityDeadlineDate ? moment.utc(this.procurementRFQBid.validityDeadlineDate).local().toDate() : this.datePickerMinDate,

            currency: this.procurementRFQBid.currency,

            priceShipment: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceShipment),
            priceProductServiceTotal: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceProductServiceTotal),
            priceDiscount: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceDiscount),
            priceTotal: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.priceTotal),
            paymentModelType: this.procurementRFQBid.paymentModelType,
            paymentMethodType: this.procurementRFQBid.paymentMethodType,
            paymentAfterOrderPrice: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentAfterOrderPrice),
            paymentAfterOrderDueDays: this.procurementRFQBid.paymentAfterOrderDueDays,
            paymentAfterInvoicePrice: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentAfterInvoicePrice),
            paymentAfterInvoiceDueDays: this.procurementRFQBid.paymentAfterInvoiceDueDays,
            paymentAfterDeliveryPrice: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentAfterDeliveryPrice),
            paymentAfterDeliveryDueDays: this.procurementRFQBid.paymentAfterDeliveryDueDays,
            paymentInstallmentCount: this.procurementRFQBid.paymentInstallmentCount,
            paymentInstallmentPeriodMonths: this.procurementRFQBid.paymentInstallmentPeriodMonths,
            paymentMilestoneCount: this.procurementRFQBid.paymentMilestoneCount,
            paymentMilestonePrice: this.valueFormatterService.toDecimalNumberStringFromFloat(this.procurementRFQBid.paymentMilestonePrice),
            paymentAfterMilestoneDeliveryDueDays: this.procurementRFQBid.paymentAfterMilestoneDeliveryDueDays,

            descriptionRFQBid: this.procurementRFQBid.descriptionRFQBid
          });

          let procurementRFQBidItems: any[] = [];

          for (var i = 0; i < data.procurementRFQBidItems.length; ++i) {
            let procurementRFQBidItem: ProcurementRFQBidItem = data.procurementRFQBidItems[i];

            let row: any = JSON.parse(JSON.stringify(procurementRFQBidItem));

            row.procurementRequest.amountRequest = this.valueFormatterService.toDecimalNumberStringFromFloat(procurementRFQBidItem.procurementRequest.amountRequest);
            row.procurementRequest.amountRequestRemaining = this.valueFormatterService.toDecimalNumberStringFromFloat(procurementRFQBidItem.procurementRequest.amountRequestRemaining);
            row.amountAvailable = this.valueFormatterService.toDecimalNumberStringFromFloat(procurementRFQBidItem.amountAvailable);
            // IMPORTANT: 2019.07.20 unitPrice decimal number up-to 4 digits
            row.unitPrice = this.valueFormatterService.toDecimalNumberStringFromFloat(procurementRFQBidItem.unitPrice, 4);
            row.taxPercent = this.valueFormatterService.toDecimalNumberStringFromFloat(procurementRFQBidItem.taxPercent);

            row.validityDeadlineDate = procurementRFQBidItem.validityDeadlineDate ? moment.utc(procurementRFQBidItem.validityDeadlineDate).local().toDate() : null;

            let deadlineDateRequest = procurementRFQBidItem.procurementRequest.deadlineDateRequest ? moment.utc(procurementRFQBidItem.procurementRequest.deadlineDateRequest).local().toDate() : this.datePickerMinDate;

            row.deliveryDatePossible = procurementRFQBidItem.deliveryDatePossible ? moment.utc(procurementRFQBidItem.deliveryDatePossible).local().toDate() : deadlineDateRequest;

            procurementRFQBidItems.push(row);
          }

          this.rows = procurementRFQBidItems;

          this.updatePriceValues();

          this.getQASCertificates();

          // https://github.com/valor-software/ng2-file-upload/issues/463
          this.uploaderQASCertificate = new FileUploader({
            url: environment.urls.popsep + "/api/party/" + this.procurementRFQBid.supplierId + "/qas/upload",
            allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'],
            maxFileSize: 10 * 1024 * 1024, // 10 MB
            queueLimit: 1,
            removeAfterUpload: true,
            itemAlias: 'files',
            isHTML5: true
          });
          this.uploaderQASCertificate.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
          // https://stackoverflow.com/questions/38502687/how-to-submit-post-data-with-ng2-file-upload-in-angular-2
          // https://github.com/valor-software/ng2-file-upload/issues/690
          this.uploaderQASCertificate.onBeforeUploadItem = (item: FileItem) => {
            item.withCredentials = false;
            this.uploaderQASCertificate.options.additionalParameter = {
              name: item.file.name,
              //parent_id: this.parentFolderId
            };
          };
          this.uploaderQASCertificate.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            this.getQASCertificates();
          }

          // https://github.com/valor-software/ng2-file-upload/issues/463
          this.uploaderRFQBidDocument = new FileUploader({
            url: environment.urls.popsep + "/api/procurement/rfq/bid/" + this.procurementRFQBid.supplierId + "/" + this.procurementRFQBid.id + "/document/upload",
            allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'],
            maxFileSize: 5 * 1024 * 1024, // 5 MB
            queueLimit: 1,
            removeAfterUpload: true,
            itemAlias: 'files',
            isHTML5: true
          });
          this.uploaderRFQBidDocument.onWhenAddingFileFailed = (item: FileLikeObject, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
          // https://stackoverflow.com/questions/38502687/how-to-submit-post-data-with-ng2-file-upload-in-angular-2
          // https://github.com/valor-software/ng2-file-upload/issues/690
          this.uploaderRFQBidDocument.onBeforeUploadItem = (item: FileItem) => {
            item.withCredentials = false;
            this.uploaderRFQBidDocument.options.additionalParameter = {
              name: item.file.name,
              //parent_id: this.parentFolderId
            };
          };
          this.uploaderRFQBidDocument.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            console.log("RFQBidDocument uploaded: " + response);
            var result = JSON.parse(response);
            if (result.returnCode == 0) {
              this.procurementRFQBid.documentName = result.data;
            }
          }
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

  getQASCertificates() {
    this.partyService.getQASCertificates(this.procurementRFQBid.supplierId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: RelationPartyQASCertificate[] = httpServiceResult.result.data;

          this.rowsQASCertificate = data;
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

  getProcurementRFQBidFromFormAndTable() {
    let procurementRFQBidClone = JSON.parse(JSON.stringify(this.procurementRFQBid));

    procurementRFQBidClone.currency = this.form.controls['currency'].value;
    procurementRFQBidClone.validityDeadlineDate = moment(this.form.controls['validityDeadlineDate'].value).utc().format('YYYY-MM-DD HH:mm:ss');
    procurementRFQBidClone.priceShipment = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['priceShipment'].value);
    procurementRFQBidClone.priceProductServiceTotal = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['priceProductServiceTotal'].value);
    procurementRFQBidClone.priceDiscount = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['priceDiscount'].value);
    procurementRFQBidClone.priceTotal = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['priceTotal'].value);
    procurementRFQBidClone.paymentModelType = this.form.controls['paymentModelType'].value;
    procurementRFQBidClone.paymentMethodType = this.form.controls['paymentMethodType'].value;
    procurementRFQBidClone.paymentAfterOrderPrice = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['paymentAfterOrderPrice'].value);
    procurementRFQBidClone.paymentAfterOrderDueDays = this.form.controls['paymentAfterOrderDueDays'].value;
    procurementRFQBidClone.paymentAfterInvoicePrice = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['paymentAfterInvoicePrice'].value);
    procurementRFQBidClone.paymentAfterInvoiceDueDays = this.form.controls['paymentAfterInvoiceDueDays'].value;
    procurementRFQBidClone.paymentAfterDeliveryPrice = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['paymentAfterDeliveryPrice'].value);
    procurementRFQBidClone.paymentAfterDeliveryDueDays = this.form.controls['paymentAfterDeliveryDueDays'].value;
    procurementRFQBidClone.paymentInstallmentCount = this.form.controls['paymentInstallmentCount'].value;
    procurementRFQBidClone.paymentInstallmentPeriodMonths = this.form.controls['paymentInstallmentPeriodMonths'].value;
    procurementRFQBidClone.paymentMilestoneCount = this.form.controls['paymentMilestoneCount'].value;
    procurementRFQBidClone.paymentMilestonePrice = this.valueFormatterService.parseDoubleValueFromTrString(this.form.controls['paymentMilestonePrice'].value);
    procurementRFQBidClone.paymentAfterMilestoneDeliveryDueDays = this.form.controls['paymentAfterMilestoneDeliveryDueDays'].value;

    procurementRFQBidClone.providerPersonFirstName = this.form.controls['providerPersonFirstName'].value;
    procurementRFQBidClone.providerPersonLastName = this.form.controls['providerPersonLastName'].value;
    procurementRFQBidClone.providerPersonPosition = this.form.controls['providerPersonPosition'].value;
    procurementRFQBidClone.providerPersonEmail = this.form.controls['providerPersonEmail'].value;
    procurementRFQBidClone.descriptionRFQBid = this.form.controls['descriptionRFQBid'].value;

    procurementRFQBidClone.stateId = 'rfq-bid-given';

    let procurementRFQBidItems: ProcurementRFQBidItem[] = [];
    for (var i = 0; i < this.rows.length; ++i) {
      let rowProcurementRFQBidItemClone = JSON.parse(JSON.stringify(this.rows[i]));

      rowProcurementRFQBidItemClone.currency = procurementRFQBidClone.currency;

      rowProcurementRFQBidItemClone.validityDeadlineDate = procurementRFQBidClone.validityDeadlineDate;
      rowProcurementRFQBidItemClone.deliveryDatePossible = moment(rowProcurementRFQBidItemClone.deliveryDatePossible).utc().format('YYYY-MM-DD HH:mm:ss');

      rowProcurementRFQBidItemClone.procurementRequest.amountRequest = this.valueFormatterService.parseDoubleValueFromTrString(rowProcurementRFQBidItemClone.procurementRequest.amountRequest);
      rowProcurementRFQBidItemClone.procurementRequest.amountRequestRemaining = this.valueFormatterService.parseDoubleValueFromTrString(rowProcurementRFQBidItemClone.procurementRequest.amountRequestRemaining);

      rowProcurementRFQBidItemClone.unitPrice = this.valueFormatterService.parseDoubleValueFromTrString(rowProcurementRFQBidItemClone.unitPrice);
      rowProcurementRFQBidItemClone.amountAvailable = this.valueFormatterService.parseDoubleValueFromTrString(rowProcurementRFQBidItemClone.amountAvailable);
      rowProcurementRFQBidItemClone.taxPercent = this.valueFormatterService.parseDoubleValueFromTrString(rowProcurementRFQBidItemClone.taxPercent);

      // IMPORTANT: Podio BUG-24: 2019.08.26
      // if canceled, or any other state, it should not be set as 'rfq-bid-given'
      if (rowProcurementRFQBidItemClone.stateId == 'waiting-rfq-bid' || rowProcurementRFQBidItemClone.stateId == 'rfq-bid-given') {
        rowProcurementRFQBidItemClone.stateId = 'rfq-bid-given';
      }

      let procurementRFQBidItem: ProcurementRFQBidItem = JSON.parse(JSON.stringify(rowProcurementRFQBidItemClone));

      procurementRFQBidItems.push(procurementRFQBidItem);
    }

    procurementRFQBidClone.procurementRFQBidItems = procurementRFQBidItems;

    return procurementRFQBidClone;
  }

  save() {
    if (this.isValid() && this.isTermsAccepted) {
      //console.log('PublicProcurementRFQBidUpdateComponent.save(): this.procurementRFQBid: ', JSON.stringify(this.procurementRFQBid));

      let procurementRFQBidClone = this.getProcurementRFQBidFromFormAndTable();

      //console.log('PublicProcurementRFQBidUpdateComponent.save(): procurementRFQBidClone', JSON.stringify(procurementRFQBidClone));

      this.procurementRFQService.giveRFQBid(procurementRFQBidClone)
        .subscribe(httpServiceResult => {
          if (httpServiceResult.success) {
            let data: ProcurementRFQBid = httpServiceResult.result.data;

            this.isRFQBidSavedAndSent = true;
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
}
