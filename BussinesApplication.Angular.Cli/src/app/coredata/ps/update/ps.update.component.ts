import { Component, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

/*import { environment } from '../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { TurkishStringService } from '../../../shared/string/turkish.string.service';

import { PS } from '../../../shared/modules/ps/models/ps.model';
import { PSService } from '../../../shared/modules/ps/services/ps.service';


import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';

import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ps-update',
  templateUrl: './ps.update.component.html',
  styleUrls: ['./ps.update.component.scss']
})
export class CoreDataPSUpdateComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private authService: AuthService,
    private turkishStringService: TurkishStringService,
    private psService: PSService) {

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
