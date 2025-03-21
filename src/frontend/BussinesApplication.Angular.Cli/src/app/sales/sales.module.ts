
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import { SalesRoutes } from './sales.routing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesOrderListComponent } from './order/list/sales.order.list.component';
import { SalesAccountingListComponent } from './accounting/list/sales.accounting.list.component';
import { DeleteGuard, SalesOrderDetailComponent } from './order/detail/sales.order.detail.component';
import { SalesAccountingDetailComponent } from './accounting/detail/sales.accounting.detail.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule,
    RouterModule.forChild([
      {
        path: 'order/list',
        component: SalesOrderListComponent
      },
      {
        path: 'order/detail/:box/:billId',
        component: SalesOrderDetailComponent,
        canDeactivate: [DeleteGuard]
      },
      {
        path: 'accounting/list',
        component: SalesAccountingListComponent
      },
      {
        path: 'accounting/detail/:box/:billId',
        component: SalesAccountingDetailComponent
      }

    ]),


  ],
  declarations: [


  ],
  // services, pipes and providers
  providers: [



    /*    UserService*/
  ]
})

export class SalesModule { }
