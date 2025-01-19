import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreDataPSCategoryListComponent } from './pscategory/list/pscategory.list.component';
import { CoreDataPSCategoryCreateComponent } from './pscategory/create/pscategory.create.component';
import { CoreDataPSCategoryUpdateComponent } from './pscategory/update/pscategory.update.component';

import { CoreDataPSListComponent } from './ps/list/ps.list.component';
import { CoreDataPSCreateComponent } from './ps/create/ps.create.component';
import { CoreDataPSUpdateComponent } from './ps/update/ps.update.component';

/*import { CoreDataUserRolesComponent } from './settings/users/roles/roles.component';*/




import { MatCardModule } from '@angular/material/card';
import { CoreDataRoutes } from './coredata.routing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'pscategory/create',
        component: CoreDataPSCategoryCreateComponent
      },
      {
        path: 'pscategory/list',
        component: CoreDataPSCategoryListComponent
      },
      {
        path: 'pscategory/update',
        component: CoreDataPSCategoryUpdateComponent
      },
      {
        path: 'ps/create',
        component: CoreDataPSCreateComponent
      },
      {
        path: 'ps/list',
        component: CoreDataPSListComponent
      },
      {
        path: 'ps/update',
        component: CoreDataPSUpdateComponent
      }
    ]),
    HeaderModule

  ],
  declarations: [
  /*  CoreDataPSCategoryCreateComponent*/
  ],
  // services, pipes and providers
  providers: [
  ]
})

export class CoreDataModule { }
