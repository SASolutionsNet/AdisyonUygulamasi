import { Component, Injectable, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

import { environment } from '../../../../environments/environment';

import { PSFeature } from '../../../shared/modules/psfeature/models/psfeature.model';
import { PS } from '../../../shared/modules/ps/models/ps.model';
import { PSService } from '../../../shared/modules/ps/services/ps.service';

import { PSFeatureValue } from '../../../shared/modules/psfeaturevalue/models/psfeaturevalue.model';
import { PSFeatureValueService } from '../../../shared/modules/psfeaturevalue/services/psfeaturevalue.service';

import { TurkishStringService } from '../../../shared/string/turkish.string.service';
import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';
import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { QueryOptions } from '../../../shared/modules/common/QueryOptions';

@Component({
  selector: 'app-ps-list',
  templateUrl: './ps.list.component.html',
  styleUrls: ['./ps.list.component.scss']
})
export class CoreDataPSListComponent implements OnInit {

  private rows: PS[] = [];

  private psCategories: PSCategory[] = [];
  reactivePSCategories: any;
  public formSearchPS: FormGroup;
  private psTempInSelectedPSCategory: PS = null;

  private isSearched: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private turkishStringService: TurkishStringService,
    private psCategoryService: PSCategoryService,
    private psService: PSService) {

    this.formSearchPS = this.fb.group({
      psCategory: [null, Validators.compose([Validators.required, this.validatePSCategory.bind(this)])]
    });
  }

  ngOnInit() {
    this.getPSCategories();
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  onActionButtonOneClicked(row) {
    var ps: PS = row;
    this.router.navigate(['../update/', ps.id], { relativeTo: this.activatedRoute });
  }

  createPSButtonClicked() {
    if (this.isAllFeatureValuesSet() && this.rows.length == 0) {
      this.psService.create(this.psTempInSelectedPSCategory)
        .subscribe(httpServiceResult => {
          if (httpServiceResult.success) {
            let data: PS = httpServiceResult.result.data;

            this.router.navigate(['/coredata/ps/update/' + data.id]);
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

  getPSCategories() {
    let qo: QueryOptions = new QueryOptions();
    qo.i = [];
    qo.i.push("Features");

    this.psCategoryService.getList(qo)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PSCategory[] = httpServiceResult.result.data;

          this.psCategories = data;

          this.formSearchPS.valueChanges.subscribe(data => {
            if (!environment.production) {
              console.log('CoreDataPSListComponent.formSearchPS.valueChanges(): data: ', data);
              console.log('CoreDataPSListComponent.formSearchPS.valueChanges(): valid: ', this.formSearchPS.valid);
            }

            if (this.formSearchPS.valid) {
              this.psTempInSelectedPSCategory = new PS();
              this.psTempInSelectedPSCategory.id = "0";
              this.psTempInSelectedPSCategory.psCategory = this.formSearchPS.controls['psCategory'].value;
              this.psTempInSelectedPSCategory.psCategoryId = this.psTempInSelectedPSCategory.psCategory.id;
              this.psTempInSelectedPSCategory.psTypeDiscriminator = this.psTempInSelectedPSCategory.psCategory.psTypeDiscriminator;
              for (var i = 0; i < this.psTempInSelectedPSCategory.psCategory.features.length; ++i) {
                let psFeature: PSFeature = this.psTempInSelectedPSCategory.psCategory.features[i];
                if (psFeature.valueType == "options") {
                  let options: string[] = JSON.parse(psFeature.options);
                  if (options.length == 1) {
                    let psFeatureValue: PSFeatureValue = new PSFeatureValue();
                    psFeatureValue.stateId = "empty";
                    psFeatureValue.psId = this.psTempInSelectedPSCategory.id;
                    psFeatureValue.psFeature = psFeature;
                    psFeatureValue.psFeatureId = psFeature.id;
                    psFeatureValue.value = options[0];
                    this.psTempInSelectedPSCategory.featureValues.push(psFeatureValue);
                  }
                }
              }
            }
            else {
              this.psTempInSelectedPSCategory = null;
            }

            this.getFormSearchPSValidationErrors();
          });

          this.reactivePSCategories = this.formSearchPS.controls['psCategory'].valueChanges
            .startWith(null)
            .map(value => this.displayPSCategoryFunction(value))
            .map(name => this.filterPSCategories(name));
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

  isAllFeatureValuesSet() {
    if (this.psTempInSelectedPSCategory != null) {
      if (this.psTempInSelectedPSCategory.featureValues != null) {
        if (this.psTempInSelectedPSCategory.featureValues.length > 0) {
          return this.psService.validate(this.psTempInSelectedPSCategory).isValid;
        }
      }
    }
    return false;
  }

  canSearchPSsByFeatureValues() {
    if (this.psTempInSelectedPSCategory != null) {
      if (this.psTempInSelectedPSCategory.featureValues != null) {
        if (this.psTempInSelectedPSCategory.featureValues.length > 0) {
          //return this.psService.validate(this.psTempInSelectedPSCategory).isValid;
          return true;
        }
      }
    }
    return false;
  }

  searchPSsByFeatureValues() {
    console.log('CoreDataPSListComponent.searchPSsByFeatureValues(): psTempInSelectedPSCategory: ', this.psTempInSelectedPSCategory);

    this.psService.searchByPSCategoryAndPSFeatureValuesPartial(this.psTempInSelectedPSCategory)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PS[] = httpServiceResult.result.data;

          this.isSearched = true;

          // initially sort by name
          data = data.sort((t1: PS, t2: PS) => {
            let t1name: any = t1.name.toString();
            let t2name: any = t2.name.toString();

            if (this.turkishStringService.isGreaterThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return 1;
            }

            if (this.turkishStringService.isLessThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return -1;
            }

            return 0;
          });

          this.rows = data;
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

  searchZeroWeightPSsByPSCategoryId() {
    console.log('CoreDataPSListComponent.searchZeroWeightPSsByPSCategoryId(): psTempInSelectedPSCategory: ', this.psTempInSelectedPSCategory);

    this.psService.getZeroWeightByPSCategoryId(this.psTempInSelectedPSCategory.psCategoryId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PS[] = httpServiceResult.result.data;

          this.isSearched = true;

          // initially sort by name
          data = data.sort((t1: PS, t2: PS) => {
            let t1name: any = t1.name.toString();
            let t2name: any = t2.name.toString();

            if (this.turkishStringService.isGreaterThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return 1;
            }

            if (this.turkishStringService.isLessThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return -1;
            }

            return 0;
          });

          this.rows = data;
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

  onPSFeatureValueChanged(psFeatureValueChangedEventData: UIEntityChangedEventData) {
    if (!environment.production) {
      console.log('CoreDataPSListComponent.onPSFeatureValueChanged(): psTempInSelectedPSCategory: ', this.psTempInSelectedPSCategory);
      console.log('CoreDataPSListComponent.onPSFeatureValueChanged(): psFeatureValueChangedEventData: ', psFeatureValueChangedEventData);
    }
    this.psTempInSelectedPSCategory.featureValues = psFeatureValueChangedEventData.data;
    this.psTempInSelectedPSCategory.name = this.psService.generatePSNameWithFeatureNames(this.psTempInSelectedPSCategory);

    this.isSearched = false;
  }

  getFormSearchPSValidationErrors() {
    Object.keys(this.formSearchPS.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.formSearchPS.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  displayPSCategoryFunction(psCategory) {
    if (psCategory) {
      if (typeof psCategory === 'object') {
        return psCategory.name;
      }
      else {
        return psCategory;
      }
    }
    else {
      psCategory;
    }
  }


  filterPSCategories(val: any) {

    this.isSearched = false;

    if (val == null) {
      return this.psCategories;
    }
    else {
      let psCategoryItems: any = this.psCategories;

      const searchedTerm = val.toLowerEnglish();

      // for searching complete search text
      const filteredRows = psCategoryItems.filter(function (d) {
        var searchedTermSplits = searchedTerm.split(' ');
        if (searchedTermSplits && searchedTermSplits.length > 0) {

          var doAllSearchedWordsExistInRow = true;

          for (var i = 0; i < searchedTermSplits.length; ++i) {
            var searchedWord = searchedTermSplits[i];

            var existsInName = false;
            if (d && d.name) {
              existsInName = d.name.toLowerEnglish().indexOf(searchedWord) !== -1 || !searchedWord;
            }
            var existsInPSCategoryDescription = false;
            if (d && d.description) {
              existsInPSCategoryDescription = d.description.toLowerEnglish().indexOf(searchedWord) !== -1 || !searchedWord;
            }

            doAllSearchedWordsExistInRow = (
              existsInName ||
              existsInPSCategoryDescription
            );

            if (!doAllSearchedWordsExistInRow) {
              break;
            }
          }

          return doAllSearchedWordsExistInRow;
        }
        else {
          return false;
        }
      });

      return filteredRows;
    }
  }

  validatePSCategory(formControl: AbstractControl) {
    if (this.psCategories) {
      let formControlValues: any[] = this.psCategories;
      if (formControlValues) {
        let isValueExists: boolean = false;
        let currentFormControlObject = formControl.value;
        if (currentFormControlObject) {

          if (typeof currentFormControlObject === 'object') {
            let currentFormControlValue: string = currentFormControlObject.id;

            for (var i = 0; i < formControlValues.length; ++i) {
              let formControlValue = formControlValues[i];

              if (formControlValue.id == currentFormControlValue) {
                isValueExists = true;

                //this.customerMeetingForm.customerContactPerson = formControlValue;
                break;
              }
            }
          }

          if (!isValueExists) {
            //if (this.customerMeetingForm != null) {
            //  this.customerMeetingForm.customerContactPerson = null;
            //}
            return { noMatchingValue: true };
          }
        }
        else {
          //if (this.customerMeetingForm != null) {
          //  this.customerMeetingForm.customerContactPerson = null;
          //}
        }
      }
      else {
        ////if (this.customerMeetingForm != null) {
        ////  this.customerMeetingForm.customerContactPerson = null;
        ////}
      }
    }
    return null;
  }

  canCreate() {
    if (this.isAllFeatureValuesSet() && this.isSearched && this.rows.length == 0 &&
      (this.authService.isPowerUser() || this.authService.hasRoleClaim("project.manager"))) {
      return true;
    }
    return false;
  }

  psIdsTemps: string[] = [];
  updatePSNamesButtonClicked() {
    this.psIdsTemps = [];
    for (let i = 0; i < this.rows.length; ++i) {
      let ps: PS = this.rows[i];
      this.psIdsTemps.push(ps.id);
    }
    this.updatePSNames();
  }
  updatePSNames() {
    if (this.psIdsTemps.length > 0) {
      let psId: string = this.psIdsTemps.pop();

      this.updatePSName(psId);
    }
  }
  updatePSName(psId: string) {
    this.psService.getById(psId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PS = httpServiceResult.result.data;
          let ps: PS = data;

          ps.name = this.psService.generatePSNameWithFeatureNames(ps);

          this.psService.update(ps)
            .subscribe(httpServiceResult => {
              if (httpServiceResult.success) {
                let data: PS = httpServiceResult.result.data;

                this.updatePSNames();
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
