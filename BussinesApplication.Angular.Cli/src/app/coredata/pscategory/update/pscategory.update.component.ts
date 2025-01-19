
import { Router, ActivatedRoute } from '@angular/router';

/*import { environment } from '../../../../environments/environment';*/



import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';

import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
    private dialog: MatDialog) {

   
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
