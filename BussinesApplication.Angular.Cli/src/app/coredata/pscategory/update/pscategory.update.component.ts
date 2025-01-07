import { Component, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

/*import { environment } from '../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { PS } from '../../../shared/modules/ps/models/ps.model';
import { PSService } from '../../../shared/modules/ps/services/ps.service';

import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';


import { ValueFormatterService } from '../../../shared/modules/common/value.formatter.service';
import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { TurkishStringService } from '../../../shared/string/turkish.string.service';
import { DialogYesNoComponent } from '../../../shared/modules/dialogyesno/dialogyesno.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pscategory-update',
  templateUrl: './pscategory.update.component.html',
  styleUrls: ['./pscategory.update.component.scss']
})
export class CoreDataPSCategoryUpdateComponent implements OnInit, OnDestroy {

 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private valueFormatterService: ValueFormatterService,
    private turkishStringService: TurkishStringService,
    private authService: AuthService,
    private psService: PSService,
    private psCategoryService: PSCategoryService) {

   
  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
 
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

 
}
