
import { Router, ActivatedRoute } from '@angular/router';

/*import { environment } from '../../../../environments/environment';*/
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PSCategoryFormComponent } from '../../../shared/modules/pscategory/form/pscategory.form.component';
import { HeaderComponent } from '../../../header/header.component';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
  selector: 'app-pscategory-create',
  templateUrl: './pscategory.create.component.html',
  styleUrls: ['./pscategory.create.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [PSCategoryFormComponent,HeaderComponent,SidebarComponent]  // Burada standalone bileşeni import edin
})
export class CoreDataPSCategoryCreateComponent implements OnInit {

  
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


}
