
import { Router, ActivatedRoute } from '@angular/router';


import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';
import { PSFormComponent } from '../../../shared/modules/ps/components/form/ps.form.component';

@Component({
  selector: 'app-ps-update',
  templateUrl: './ps.update.component.html',
  styleUrls: ['./ps.update.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [PSFormComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class CoreDataPSUpdateComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
