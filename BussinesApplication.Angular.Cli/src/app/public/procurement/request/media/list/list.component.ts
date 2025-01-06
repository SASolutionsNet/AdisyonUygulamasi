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

import { ValueFormatterService } from '../../../../../shared/modules/common/value.formatter.service';
import { ValidationError } from '../../../../../shared/modules/common/validationError';

import { Party, RelationPartyQASCertificate, PartyService } from '../../../../../shared/modules/party/party.service';
import { ProcurementRequest, ProcurementRequestService } from '../../../../../shared/modules/procurement/request/procurementrequest.service';
import { ProcurementRFQBid, ProcurementRFQBidItem, ProcurementRFQService } from '../../../../../shared/modules/procurement/rfq/procurementrfq.service';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-public-procurement-request-media-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PublicProcurementRequestMediaListComponent implements OnInit, OnDestroy, AfterViewInit {

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

  procurementRequestId: string;
  procurementRequest: ProcurementRequest;
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

  uploaderProcurementRequestMedia: FileUploader;
  fileUploadErrorMesssage: string = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    zone: NgZone,
    private cdRef: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private unitService: UnitService,
    private valueFormatterService: ValueFormatterService,
    private partyService: PartyService,
    private procurementRequestService: ProcurementRequestService) {

    this.environment = environment;

    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    this.datePickerMinDate = moment().utc().add(1, 'd').local().toDate();
    this.datePickerStartDate = this.datePickerMinDate;
  }

  ngOnChanges(): void {
  }

  ngOnInit() {
    this.subscribedParameter = this.activatedRoute.params.subscribe(params => {
      this.procurementRequestId = params['procurementRequestId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.getProcurementRequest();
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

  getProcurementRequestMedia(row) {
    this.procurementRequestService.getMediaDocument(row.id, row.fileName);
  }

  getProcurementRequest() {
    this.procurementRequestService.getById(this.procurementRequestId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: ProcurementRequest = httpServiceResult.result.data;

          this.procurementRequest = data;
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
