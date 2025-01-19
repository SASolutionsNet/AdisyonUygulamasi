
import { Router, ActivatedRoute } from '@angular/router';

/*import { environment } from '../../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../errordialog/errordialog.component';

import { PSCategory, PSCategoryService } from '../pscategory.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'sasolution-pscategory-form',
  templateUrl: './pscategory.form.component.html',
  styleUrls: ['./pscategory.form.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PSCategoryFormComponent {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog) {

  
  }

  ngOnInit() {
   
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  convertFieldValueToUpperCase(formControl: FormControl) {
    //if (formControl && formControl.value) {
    //  let upperCaseValue: string = formControl.value.turkishToUpper();

    //  formControl.setValue(upperCaseValue);
    //}
  }

  isActive() {
   /* return !this.form.controls['isDeleted'].value;*/
  }

  isDeletedToggle() {
    //this.form.patchValue({
    //  isDeleted: !this.form.controls['isDeleted'].value
    //});
  }

  isDeletedCheckboxDisabled() {
   /* return this.crudType != 'update';*/
  }
}
