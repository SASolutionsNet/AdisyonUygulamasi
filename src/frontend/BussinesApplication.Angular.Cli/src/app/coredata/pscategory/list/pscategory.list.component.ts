
import { Router, ActivatedRoute } from '@angular/router';


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { PSCategoryListComponent } from '../../../shared/modules/pscategory/list/pscategory.list.component';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'pscategory-list',
  templateUrl: './pscategory.list.component.html',
  styleUrls: ['./pscategory.list.component.scss'],
   standalone: true,  // Standalone olarak işaretleyin
  imports: [PSCategoryListComponent, HeaderComponent,SidebarComponent]  // Burada standalone bileşeni import edin
})
export class CoreDataPSCategoryListComponent implements OnInit {

  private psTotalCount: number = 0;
  private maxPSCount: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }




 
}
