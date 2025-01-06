import { Routes } from '@angular/router';
import { CoreDataPSListComponent } from './ps/list/ps.list.component';
import { CoreDataPSCreateComponent } from './ps/create/ps.create.component';
import { CoreDataPSUpdateComponent } from './ps/update/ps.update.component';

//import { AuthGuardService } from '../shared/modules/auth/auth-guard.service';

//import { CoreDataSettingsUserListComponent } from './settings/users/list/list.component';
//import { CoreDataUserRolesComponent } from './settings/users/roles/roles.component';

//import { CoreDataPartyListComponent } from './party/list/party.list.component';
//import { CoreDataPartyCreateComponent } from './party/create/party.create.component';
//import { CoreDataPartyUpdateComponent } from './party/update/party.update.component';

//import { CoreDataPSCategoryListComponent } from './pscategory/list/pscategory.list.component';
//import { CoreDataPSCategoryCreateComponent } from './pscategory/create/pscategory.create.component';
//import { CoreDataPSCategoryUpdateComponent } from './pscategory/update/pscategory.update.component';

//import { CoreDataPSListComponent } from './ps/list/ps.list.component';
//import { CoreDataPSCreateComponent } from './ps/create/ps.create.component';
//import { CoreDataPSUpdateComponent } from './ps/update/ps.update.component';
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

export const CoreDataRoutes: Routes = [
  {
    path: '',
    children: [
      {
       
      
        path: 'ps',
        children: [
          {
          //  canActivate: [AuthGuardService],
            path: 'list',
            component: CoreDataPSListComponent,
            data: { roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager'] }
          },
          {
          //  canActivate: [AuthGuardService],
            path: 'create',
            component: CoreDataPSCreateComponent,
            data: { roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
          },
          {
          //  canActivate: [AuthGuardService],
            path: 'update/:id',
            component: CoreDataPSUpdateComponent,
            data: { roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
          }
        ]
      }
    ]
  }
];
