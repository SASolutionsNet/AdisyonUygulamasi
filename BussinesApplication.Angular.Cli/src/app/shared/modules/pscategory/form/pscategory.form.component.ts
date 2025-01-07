import { Component, Injectable, ChangeDetectorRef, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

/*import { environment } from '../../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../errordialog/errordialog.component';

import { PSCategory, PSCategoryService } from '../pscategory.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'sasolution-pscategory-form',
  templateUrl: './pscategory.form.component.html',
  styleUrls: ['./pscategory.form.component.scss']
})
export class PSCategoryFormComponent {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dataService: PSCategoryService) {

  
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
