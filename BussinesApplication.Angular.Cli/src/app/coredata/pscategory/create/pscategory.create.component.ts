import { Component, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { environment } from '../../../../environments/environment';

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { UnitService } from '../../../shared/modules/unit/unit.service';

import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';

@Component({
  selector: 'app-pscategory-create',
  templateUrl: './pscategory.create.component.html',
  styleUrls: ['./pscategory.create.component.scss']
})
export class CoreDataPSCategoryCreateComponent implements OnInit {

  public form: FormGroup;
  private psCategory: PSCategory;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public unitService: UnitService,
    private authService: AuthService,
    public dataService: PSCategoryService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  onFormValuesChanged(form) {
    this.form = form;

    if (!environment.production) {
      console.log('CoreDataPSCategoryCreateComponent.onFormValuesChanged(): form: ' + JSON.stringify(this.form.value));
    }
  }

  isFormValid() {
    if (this.form) {
      return this.form.valid;
    }
    return false;
  }

  save() {
    // https://toddmotto.com/angular-2-forms-reactive
    if (!environment.production) {
      console.log(this.form.value, this.form.valid);
    }

    if (this.form.valid) {
      this.psCategory = this.form.value;

      if (!environment.production) {
        console.log('CoreDataPSCategoryCreateComponent.save(): psCategory = ' + JSON.stringify(this.psCategory));
      }

      this.dataService.create(this.psCategory)
        .subscribe(httpServiceResult => {
          if (httpServiceResult.success) {
            let data: PSCategory = httpServiceResult.result.data;

            this.psCategory = data;

            this.router.navigate(['/coredata/pscategory/update/' + this.psCategory.id]);
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
