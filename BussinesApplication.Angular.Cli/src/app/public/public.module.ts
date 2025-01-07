import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PricePipeTr } from '../shared/formatters/price-tr.pipe';

import { PublicRoutes } from './public.routing';

/*import { UnitService } from '../shared/modules/unit/unit.service';*/


import { PSCategoryModule } from '../shared/modules/pscategory/pscategory.module';
import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicRoutes),
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    PSCategoryModule
  ],
  declarations: [
 
  ],
  // services, pipes and providers
  providers: [
    // https://stackoverflow.com/questions/34904683/how-to-set-locale-in-datepipe-in-angular2
    // https://stackoverflow.com/questions/34904683/how-to-set-locale-in-datepipe-in-angular2/39344889
    { provide: LOCALE_ID, useValue: "tr-TR" },
    PricePipeTr,

 
    PSCategoryService,
  
  ]
})

export class PublicModule { }
