import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PricePipeTr } from '../shared/formatters/price-tr.pipe';

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
import { PSCategoryModule } from '../shared/modules/pscategory/pscategory.module';
import { PSModule } from '../shared/modules/ps/ps.module';
import { SalesOrderModule } from '../shared/modules/sales/order/order.module';
import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';
import { PSService } from '../shared/modules/ps/services/ps.service';
import { SalesOrderService } from '../shared/modules/sales/order/services/order.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SalesRoutes),
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

    PSCategoryModule,
    PSModule,

    SalesOrderModule
  ],
  declarations: [


  ],
  // services, pipes and providers
  providers: [
    PricePipeTr,

    PSCategoryService,
    PSService,

    
    SalesOrderService,


/*    UserService*/
  ]
})

export class SalesModule { }
