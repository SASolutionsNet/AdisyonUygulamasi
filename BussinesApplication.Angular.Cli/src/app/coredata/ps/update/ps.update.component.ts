import { Component, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { environment } from '../../../../environments/environment';

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { TurkishStringService } from '../../../shared/string/turkish.string.service';

import { PSFeature } from '../../../shared/modules/psfeature/models/psfeature.model';
import { PS } from '../../../shared/modules/ps/models/ps.model';
import { PSService } from '../../../shared/modules/ps/services/ps.service';

import { PSFeatureValue } from '../../../shared/modules/psfeaturevalue/models/psfeaturevalue.model';
import { PSFeatureValueService } from '../../../shared/modules/psfeaturevalue/services/psfeaturevalue.service';

import { PSPrice } from '../../../shared/modules/psprice/models/psprice.model';
import { PSPriceService } from '../../../shared/modules/psprice/services/psprice.service';

import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';

import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';

@Component({
  selector: 'app-ps-update',
  templateUrl: './ps.update.component.html',
  styleUrls: ['./ps.update.component.scss']
})
export class CoreDataPSUpdateComponent implements OnInit, OnDestroy {

  psId: string;
  ps: PS;
  private subscribedParameter: any;

  psFeatureValueRows = [];
  rowsPSPrices = [];

  private showUpdatePriceActionButton: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private authService: AuthService,
    private turkishStringService: TurkishStringService,
    private psPriceService: PSPriceService,
    private psService: PSService) {

  }

  ngOnInit() {
    this.showUpdatePriceActionButton = this.authService.hasRoleClaim('power.user') || this.authService.hasRoleClaim('it.manager') || this.authService.hasRoleClaim('project.manager');

    this.subscribedParameter = this.activatedRoute.params.subscribe(params => {
      this.psId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.getPS();
      this.getPSPricesByPSId();
    });
  }

  ngOnDestroy() {
    if (this.subscribedParameter) {
      this.subscribedParameter.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  onPSFormValuesChanged(eventData: UIEntityChangedEventData) {
    this.ps = eventData.data;

    if (!environment.production) {
      console.log('CoreDataPSUpdateComponent.onPSFormValuesChanged(): entity: ', this.ps);
    }
  }

  onPSFeatureValueChanged(psFeatureValueChangedEventData) {
    if (!environment.production) {
      console.log('CoreDataPSUpdateComponent.onPSFeatureValueChanged(): ps: ', this.ps);
      console.log('CoreDataPSUpdateComponent.onPSFeatureValueChanged(): psFeatureValueChangedEventData: ', psFeatureValueChangedEventData);
    }
    this.ps.featureValues = psFeatureValueChangedEventData.data;
    this.ps.name = this.psService.generatePSNameWithFeatureNames(this.ps);
  }

  isPSValid() {
    return this.psService.validate(this.ps).isValid;
  }

  onPSFeatureValueListActionButtonOneClicked(psFeatureValueRow) {
    this.router.navigate(['/coredata/ps/featurevalue/update/' + this.psId + '/' + psFeatureValueRow.psFeatureId]);
  }

  onPSPriceDataLoaded(event) {

  }

  onPSPriceActionButtonOneClicked(row: PSPrice) {
    this.router.navigate(['/coredata/ps/price/update/' + this.psId + '/' + row.channelId + '/' + row.sellerId + '/' + row.customerId]);
  }

  onPSPriceFilterUpdated(event) {

  }

  onPSPriceSearchKeywordChanged(event) {

  }

  onPSPriceCreateButtonCliecked(event) {
    this.router.navigate(['/coredata/ps/price/create/' + this.psId]);
  }

  getPS() {
    this.psService.getById(this.psId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PS = httpServiceResult.result.data;

          this.ps = data;
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

  getPSPricesByPSId() {
    this.psPriceService.getListByPSId(this.psId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PSPrice[] = httpServiceResult.result.data;

          // initially sort by name
          data = data.sort((t1: PSPrice, t2: PSPrice) => {
            let t1name: any = t1.ps.name.toString();
            let t2name: any = t2.ps.name.toString();

            if (this.turkishStringService.isGreaterThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return 1;
            }

            if (this.turkishStringService.isLessThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return -1;
            }

            return 0;
          });

          this.rowsPSPrices = data;
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

  save() {
    if (this.isPSValid()) {
      if (!environment.production) {
        console.log('CoreDataPSUpdateComponent.save(): ps', this.ps);
      }

      this.psService.update(this.ps)
        .subscribe(httpServiceResult => {
          if (httpServiceResult.success) {
            let data: PS = httpServiceResult.result.data;

            this.router.navigate(['/coredata/ps/list']);
          }
          else {
            if (httpServiceResult.result != null) {
              if (httpServiceResult.result.returnCode == 41) {
                let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '300px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
                dialogRef.componentInstance.setContent('Hata / Sorun', null, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', 'Bu özelliklere sahip bir ürün zaten kayıtlı.');
              }
              else {
                let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
                dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
              }
            }
            else {
              let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
              dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
            }
          }
        },
          (err) => {
            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
          });
    }
  }
}
