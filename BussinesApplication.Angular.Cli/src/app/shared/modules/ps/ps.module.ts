import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TagInputModule } from 'ngx-chips';

import { PricePipeTr } from '../../formatters/price-tr.pipe';

import { PSFormComponent } from './components/form/ps.form.component';
import { PSListComponent } from './components/list/ps.list.component';

import { PSRoutes } from './ps.routing';

import { PSService } from './services/ps.service';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PSRoutes),
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  declarations: [
    PSFormComponent,
    PSListComponent
  ],
  exports: [
    PSFormComponent,
    PSListComponent
  ],
  // services, pipes and providers
  providers: [
    PricePipeTr,

    PSService
  ]
})

export class PSModule { }
