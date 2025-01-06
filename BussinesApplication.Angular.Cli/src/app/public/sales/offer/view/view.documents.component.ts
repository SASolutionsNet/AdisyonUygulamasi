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

import { ValueFormatterService } from '../../../../shared/modules/common/value.formatter.service';

import { Party, RelationPartyQASCertificate, PartyService } from '../../../../shared/modules/party/party.service';
import { SalesOffer, SalesOfferCustomerFile } from '../../../../shared/modules/sales/offer/models/offer.model';
import { SalesOfferService } from '../../../../shared/modules/sales/offer/services/offer.service';

@Component({
  selector: 'app-public-sales-offer-view-docu',
  templateUrl: './view.documents.component.html',
  styleUrls: ['./view.documents.component.scss']
})
export class PublicSalesOfferViewDocumentsComponent implements OnInit {

  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;

  salesOfferId: string;
  salesOffer: SalesOffer;
  private subscribedParameter: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private unitService: UnitService,
    private valueFormatterService: ValueFormatterService,
    private partyService: PartyService,
    private salesOfferService: SalesOfferService) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');
  }

  ngOnInit() {
    this.subscribedParameter = this.activatedRoute.params.subscribe(params => {
      this.salesOfferId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.getSalesOffer();
    });
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  getCustomerFile(row) {
    this.salesOfferService.getCustomerFile(row.id, row.fileName);
  }

  deleteCustomerFile(row) {
    this.salesOfferService.deleteCustomerFile(row.id)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          this.getSalesOffer();
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

  hasDocumentSalesOfferTenantSignedFileName() {
    return this.salesOffer != null ? (this.salesOffer.documentSalesOfferTenantSignedFileName != null) : false;
  }

  getDocumentSalesOfferTenantSignedFileName() {
    this.salesOfferService.getDocument(this.salesOffer.id, "tenantsignedoffer", this.salesOffer.documentSalesOfferTenantSignedFileName);
  }

  hasDocumentSalesContractCustomerSignedFileName() {
    return this.salesOffer != null ? (this.salesOffer.documentSalesContractCustomerSignedFileName != null) : false;
  }

  getDocumentSalesContractCustomerSignedFileName() {
    this.salesOfferService.getDocument(this.salesOffer.id, "customersignedcontract", this.salesOffer.documentSalesContractCustomerSignedFileName);
  }

  getSalesOffer() {
    this.salesOfferService.getPublicById(this.salesOfferId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: SalesOffer = httpServiceResult.result.data;

          this.salesOffer = data;
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
