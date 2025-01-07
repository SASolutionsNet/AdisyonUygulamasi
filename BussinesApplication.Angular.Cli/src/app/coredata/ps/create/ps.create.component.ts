import { Component, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/*import { environment } from '../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

/*import { AuthService } from '../../../shared/modules/auth/auth.service';*/



import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';

import { PS } from '../../../shared/modules/ps/models/ps.model';
import { PSService } from '../../../shared/modules/ps/services/ps.service';


import { ValueFormatterService } from '../../../shared/modules/common/value.formatter.service';
import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ps-create',
  templateUrl: './ps.create.component.html',
  styleUrls: ['./ps.create.component.scss']
})
export class CoreDataPSCreateComponent implements OnInit {

  private ps: PS | null = null;


  private currentState: number = 0;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private valueFormatterService: ValueFormatterService,
   /* private authService: AuthService,*/
    private psService: PSService) {
    if (this.ps == null) {
      this.ps = new PS();
    }
  }

  ngOnInit() {
    if (this.ps == null) {
      this.ps = new PS();
    }
  }

  ngAfterViewChecked() {
   // explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  setState(state: number) {
    switch (state) {
      case 0: {

        this.currentState = state;
        break;
      }
      case 1: {
        this.ps = new PS();
        this.ps.id = "0";
       

        //if (!environment.production) {
        //  console.log('CoreDataPSCreateComponent.setState(): ps: ', this.ps);
        //}

        this.currentState = state;
        break;
      }
      default: {
        this.setState(0);
        break;
      }
    }
  }

  //onSelectPSCategories(selected) {
  //  if (selected && selected.length == 1) {
  //    this.selectedPSCategory = selected[0];
  //  }
  //}

  //onPSCategoryDataLoaded(rows) {

  //}

  //onPSCategoryFilterUpdated(rows) {

  //}

  //onPSFormValuesChanged(psFormChangedEventData: UIEntityChangedEventData) {
  //  this.ps = psFormChangedEventData.data;

  //  //if (!environment.production) {
  //  //  console.log('CoreDataPSCreateComponent.onPSFormValuesChanged(): ps: ', this.ps);
  //  //}
  //}

  //onPSFeatureValueChanged(psFeatureValueChangedEventData: UIEntityChangedEventData) {
  //  //if (!environment.production) {
  //  //  console.log('CoreDataPSCreateComponent.onPSFeatureValueChanged(): ps: ', this.ps);
  //  //  console.log('CoreDataPSCreateComponent.onPSFeatureValueChanged(): psFeatureValueChangedEventData: ', psFeatureValueChangedEventData);
  //  //}
  //  this.ps.featureValues = psFeatureValueChangedEventData.data;
  //  this.ps.name = this.psService.generatePSNameWithFeatureNames(this.ps);
  //}

  //isPSValid() {
  //  return this.psService.validate(this.ps).isValid;
  //}

  //save() {
  //  if (this.isPSValid()) {

  //    //if (!environment.production) {
  //    //  console.log('CoreDataPSCreateComponent.save(): ps ', this.ps);
  //    //}

  //    this.psService.create(this.ps)
  //      .subscribe(httpServiceResult => {
  //        if (httpServiceResult.success) {
  //          let data: PS = httpServiceResult.result.data;

  //          this.router.navigate(['/coredata/ps/update/' + data.id]);
  //        }
  //        else {
  //          if (httpServiceResult.result != null) {
  //            if (httpServiceResult.result.returnCode == 41) {
  //              let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '300px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //              dialogRef.componentInstance.setContent('Hata / Sorun', null, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', 'Bu özelliklere sahip bir ürün zaten kayıtlı.');
  //            }
  //            else {
  //              let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //              dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
  //            }
  //          }
  //          else {
  //            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //            dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
  //          }
  //        }
  //      },
  //      (err) => {
  //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
  //      });
  //  }
  //}
}
