
import { Router, ActivatedRoute } from '@angular/router';




import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../../header/header.component';
import { PSFormComponent } from '../../../shared/modules/ps/components/form/ps.form.component';

@Component({
  selector: 'app-ps-create',
  templateUrl: './ps.create.component.html',
  styleUrls: ['./ps.create.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [PSFormComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class CoreDataPSCreateComponent implements OnInit {



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
    // explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

}
