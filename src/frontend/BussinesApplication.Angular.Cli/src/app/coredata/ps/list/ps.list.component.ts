
import { Router, ActivatedRoute } from '@angular/router';

import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PSListComponent } from '../../../shared/modules/ps/components/list/ps.list.component';
import { HeaderComponent } from '../../../header/header.component';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ps-list',
  templateUrl: './ps.list.component.html',
  styleUrls: ['./ps.list.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [PSListComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class CoreDataPSListComponent implements OnInit {

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
