import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';




import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';


/*import { UserService } from '../shared/modules/user/services/user.service';*/

import { SalesOrderService } from '../shared/modules/sales/order/services/order.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';
import { PSService } from '../shared/modules/ps/services/ps.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule

  ],
  declarations: [
    DashboardComponent
  ],
  // services, pipes and providers
  providers: [
   
    PSCategoryService,
    PSService,
   
    SalesOrderService,
   
   /* UserService*/
  ]
})

export class DashboardModule { }
