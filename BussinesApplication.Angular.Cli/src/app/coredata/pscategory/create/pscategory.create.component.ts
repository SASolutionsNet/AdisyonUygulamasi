import { Component, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/*import { environment } from '../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pscategory-create',
  templateUrl: './pscategory.create.component.html',
  styleUrls: ['./pscategory.create.component.scss']
})
export class CoreDataPSCategoryCreateComponent implements OnInit {

  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    public dataService: PSCategoryService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }


}
