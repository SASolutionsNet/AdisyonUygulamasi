import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PricePipeTr } from '../../../formatters/price-tr.pipe';


import { SalesOrderListComponent } from './components/list/order.list.component';
import { SalesOrderDetailComponent } from './components/detail/order.detail.component';

import { SalesOrderRoutes } from './order.routing';

import { SalesOrderService } from './services/order.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SalesOrderRoutes),
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule,

  ],
  declarations: [
    SalesOrderListComponent,
    SalesOrderDetailComponent
  ],
  exports: [
    SalesOrderListComponent,
    SalesOrderDetailComponent
  ],
  // services, pipes and providers
  providers: [
    PricePipeTr,

    SalesOrderService

  ]
})

export class SalesOrderModule { }
