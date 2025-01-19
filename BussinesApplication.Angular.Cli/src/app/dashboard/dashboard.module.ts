import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';




import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';


import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutes } from '../app.routing';
import { SidebarModule } from '../sidebar/sidebar.module';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    DashboardComponent,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ]),
    //SidebarModule
  ],
  exports: [DashboardComponent],  // DashboardComponent'i export et
  providers: [
   
  ]
})

export class DashboardModule { }
