
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PSCategoryRoutes } from './pscategory.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    //RouterModule.forChild(PSCategoryRoutes),
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    //PSCategoryListComponent,
    //PSCategoryFormComponent,
  ],
  exports: [
    //PSCategoryListComponent,
    //PSCategoryFormComponent
  ],
  // services, pipes and providers
  providers: [
  ]
})

export class PSCategoryModule { }
