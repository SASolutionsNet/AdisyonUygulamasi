
import { Router, ActivatedRoute } from '@angular/router';

/*import { environment } from '../../../../environments/environment';*/



import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';

import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PSCategoryFormComponent } from '../../../shared/modules/pscategory/form/pscategory.form.component';
import { HeaderComponent } from '../../../header/header.component';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'pscategory-update',
  templateUrl: './pscategory.update.component.html',
  styleUrls: ['./pscategory.update.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [PSCategoryFormComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
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
