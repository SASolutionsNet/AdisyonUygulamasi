import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDataPSCategoryListComponent } from './pscategory/list/pscategory.list.component';
import { CoreDataPSCategoryCreateComponent } from './pscategory/create/pscategory.create.component';
import { CoreDataPSCategoryUpdateComponent } from './pscategory/update/pscategory.update.component';

import { CoreDataPSListComponent } from './ps/list/ps.list.component';
import { CoreDataPSCreateComponent } from './ps/create/ps.create.component';
import { CoreDataPSUpdateComponent } from './ps/update/ps.update.component';

/*import { CoreDataUserRolesComponent } from './settings/users/roles/roles.component';*/




import { PSCategoryModule } from '../shared/modules/pscategory/pscategory.module';
import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';

import { PSModule } from '../shared/modules/ps/ps.module';
import { PSService } from '../shared/modules/ps/services/ps.service';

/*import { UserService } from '../shared/modules/user/services/user.service';*/

import { PricePipeTr } from '../shared/formatters/price-tr.pipe';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CoreDataRoutes),
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

    PSCategoryModule,
    PSModule
  ],
  declarations: [

    CoreDataPSCategoryListComponent,
    CoreDataPSCategoryCreateComponent,
    CoreDataPSCategoryUpdateComponent,

    CoreDataPSListComponent,
    CoreDataPSCreateComponent,
    CoreDataPSUpdateComponent,
    
  ],
  // services, pipes and providers
  providers: [
    PricePipeTr,

    PSCategoryService,
    PSService,
   /* UserService*/
  ]
})

export class CoreDataModule { }
