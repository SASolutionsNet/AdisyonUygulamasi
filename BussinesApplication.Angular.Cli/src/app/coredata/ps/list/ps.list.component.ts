import { Component, Injectable, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

/*import { environment } from '../../../../environments/environment';*/

import { PS } from '../../../shared/modules/ps/models/ps.model';
import { PSService } from '../../../shared/modules/ps/services/ps.service';

import { TurkishStringService } from '../../../shared/string/turkish.string.service';
import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';
import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { QueryOptions } from '../../../shared/modules/common/QueryOptions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ps-list',
  templateUrl: './ps.list.component.html',
  styleUrls: ['./ps.list.component.scss']
})
export class CoreDataPSListComponent implements OnInit {

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

 
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

 
}
