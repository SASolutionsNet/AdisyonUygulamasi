import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatTabsModule, MatDialogModule, MatProgressBarModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MatNativeDateModule, MatDatepickerIntl } from '@angular/material';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { FlexLayoutModule } from '@angular/flex-layout';
//import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

//import { MatDatepickerIntlTr } from '../shared/datepicker/datepicker-intl-tr'

//import { PricePipeTr } from '../shared/formatters/price-tr.pipe';

//import { CoreDataRoutes } from './coredata.routing';

//import { CoreDataPartyListComponent } from './party/list/party.list.component';
//import { CoreDataPartyCreateComponent } from './party/create/party.create.component';
//import { CoreDataPartyUpdateComponent } from './party/update/party.update.component';

//import { CoreDataPSCategoryListComponent } from './pscategory/list/pscategory.list.component';
//import { CoreDataPSCategoryCreateComponent } from './pscategory/create/pscategory.create.component';
//import { CoreDataPSCategoryUpdateComponent } from './pscategory/update/pscategory.update.component';

import { CoreDataPSListComponent } from './ps/list/ps.list.component';
import { CoreDataPSCreateComponent } from './ps/create/ps.create.component';
import { CoreDataPSUpdateComponent } from './ps/update/ps.update.component';
//import { CoreDataPSFeatureValueUpdateComponent } from './ps/featurevalue/update/psfeaturevalue.update.component';
//import { CoreDataPSPriceCreateComponent } from './ps/price/create/psprice.create.component';
//import { CoreDataPSPriceUpdateComponent } from './ps/price/update/psprice.update.component';

//import { CoreDataPSFeatureCreateComponent } from './pscategory/feature/create/psfeature.create.component';
//import { CoreDataPSFeatureUpdateComponent } from './pscategory/feature/update/psfeature.update.component';

//import { PSCategorySupplierListComponent } from './pscategory/supplier/list/list.component';
//import { PSCategorySupplierCreateComponent } from './pscategory/supplier/create/create.component';

//import { CoreDataFacilityListComponent } from './facility/list/list.component';
//import { CoreDataFacilityCreateComponent } from './facility/create/create.component';
//import { CoreDataFacilityUpdateComponent } from './facility/update/update.component';

//import { CoreDataFacilityStorageCreateComponent } from './facility/storage/create/create.component';
//import { CoreDataFacilityStorageUpdateComponent } from './facility/storage/update/update.component';

//import { CoreDataAssetListComponent } from './asset/list/asset.list.component';
//import { CoreDataAssetCreateComponent } from './asset/create/asset.create.component';
//import { CoreDataAssetUpdateComponent } from './asset/update/asset.update.component';

//import { CoreDataSettingsUserListComponent } from './settings/users/list/list.component';
//import { CoreDataUserRolesComponent } from './settings/users/roles/roles.component';

//import { UnitService } from '../shared/modules/unit/unit.service';

//import { PartyModule } from '../shared/modules/party/party.module';
//import { PartyService } from '../shared/modules/party/party.service';

//import { PSCategoryModule } from '../shared/modules/pscategory/pscategory.module';
//import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';

/*import { PSModule } from '../shared/modules/ps/ps.module';*/
/*import { PSService } from '../shared/modules/ps/services/ps.service';*/

//import { PSFeatureModule } from '../shared/modules/psfeature/psfeature.module';
//import { PSFeatureService } from '../shared/modules/psfeature/services/psfeature.service';

//import { PSFeatureValueModule } from '../shared/modules/psfeaturevalue/psfeaturevalue.module';
//import { PSFeatureValueService } from '../shared/modules/psfeaturevalue/services/psfeaturevalue.service';

//import { PSPriceModule } from '../shared/modules/psprice/psprice.module';
//import { PSPriceService } from '../shared/modules/psprice/services/psprice.service';

//import { FacilityModule } from '../shared/modules/facility/facility.module';
//import { FacilityService } from '../shared/modules/facility/facility.service';

//import { UserService } from '../shared/modules/user/services/user.service';

//import { AssetModule } from '../shared/modules/asset/asset.module';
//import { AssetService } from '../shared/modules/asset/services/asset.service';

@NgModule({
  imports: [
    CommonModule,
    //RouterModule.forChild(CoreDataRoutes),
    //MatAutocompleteModule,
    //MatCardModule,
    //MatInputModule,
    //MatButtonModule,
    //MatCheckboxModule,
    //MatIconModule,
    //MatTabsModule,
    //MatDialogModule,
    //MatNativeDateModule,
    //MatProgressBarModule,
    //FlexLayoutModule,
    //FileUploadModule,
    //NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,

    //PartyModule,
    //PSCategoryModule,
    //PSFeatureModule,
    //PSModule,
    //PSFeatureValueModule,
    //PSPriceModule,
    //FacilityModule,
    //AssetModule
  ],
  declarations: [
    //CoreDataPartyListComponent,
    //CoreDataPartyCreateComponent,
    //CoreDataPartyUpdateComponent,

    //CoreDataPSCategoryListComponent,
    //CoreDataPSCategoryCreateComponent,
    //CoreDataPSCategoryUpdateComponent,

    CoreDataPSListComponent,
    CoreDataPSCreateComponent,
    CoreDataPSUpdateComponent,
    //CoreDataPSFeatureValueUpdateComponent,
    //CoreDataPSPriceCreateComponent,
    //CoreDataPSPriceUpdateComponent,

    //CoreDataPSFeatureCreateComponent,
    //CoreDataPSFeatureUpdateComponent,

    //PSCategorySupplierListComponent,
    //PSCategorySupplierCreateComponent,

    //CoreDataFacilityListComponent,
    //CoreDataFacilityCreateComponent,
    //CoreDataFacilityUpdateComponent,

    //CoreDataFacilityStorageCreateComponent,
    //CoreDataFacilityStorageUpdateComponent,

    //CoreDataAssetListComponent,
    //CoreDataAssetCreateComponent,
    //CoreDataAssetUpdateComponent,

    //CoreDataSettingsUserListComponent,
    //CoreDataUserRolesComponent
  ],
  // services, pipes and providers
  providers: [
    //PricePipeTr,

    //PartyService,
    PSCategoryService,
    //PSFeatureService,
    PSService,
    //PSFeatureValueService,
    //PSPriceService,
    //FacilityService,
    //AssetService,
    //UnitService,
    //UserService
  ]
})

export class CoreDataModule { }
