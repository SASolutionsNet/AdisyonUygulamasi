import { Routes } from '@angular/router';

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
    //path: '',
    //children: [
    //  {
    //    path: 'party',
    //    children: [
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'list',
    //        component: CoreDataPartyListComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.admin', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'create',
    //        component: CoreDataPartyCreateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'coredata.party.editor', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'update/:id',
    //        component: CoreDataPartyUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'coredata.party.editor', 'procurement.user', 'procurement.manager'] }
    //      }
    //    ]
    //  },
    //  {
    //    path: 'pscategory',
    //    children: [
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'list',
    //        component: CoreDataPSCategoryListComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'create',
    //        component: CoreDataPSCategoryCreateComponent,
    //        data: { roles: ['power.user', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'update/:id',
    //        component: CoreDataPSCategoryUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'supplier/list/:psCategoryId',
    //        component: PSCategorySupplierListComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'supplier/create/:psCategoryId',
    //        component: PSCategorySupplierCreateComponent,
    //        data: { roles: ['power.user', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'feature/create/:psCategoryId',
    //        component: CoreDataPSFeatureCreateComponent,
    //        data: { roles: ['power.user', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'feature/update/:psCategoryId/:psFeatureId',
    //        component: CoreDataPSFeatureUpdateComponent,
    //        data: { roles: ['power.user', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
    //      }
    //    ]
    //  },
    //  {
    //    path: 'ps',
    //    children: [
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'list',
    //        component: CoreDataPSListComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'create',
    //        component: CoreDataPSCreateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'update/:id',
    //        component: CoreDataPSUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'featurevalue/update/:psId/:psFeatureId',
    //        component: CoreDataPSFeatureValueUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'coredata.ps.editor', 'procurement.user', 'procurement.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'price/create/:psId',
    //        component: CoreDataPSPriceCreateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'project.manager', 'sales.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'price/update/:psId/:channelId/:sellerId/:customerId',
    //        component: CoreDataPSPriceUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'project.manager', 'sales.manager'] }
    //      }
    //    ]
    //  },
    //  {
    //    path: 'facility',
    //    children: [
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'list',
    //        component: CoreDataFacilityListComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'create',
    //        component: CoreDataFacilityCreateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'update/:id',
    //        component: CoreDataFacilityUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'storage/create/:facilityId',
    //        component: CoreDataFacilityStorageCreateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'storage/update/:facilityId/:facilityStorageId',
    //        component: CoreDataFacilityStorageUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'procurement.user', 'procurement.manager', 'production.manager', 'inventory.manager'] }
    //      },
    //    ]
    //  },
    //  {
    //    path: 'asset',
    //    children: [
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'list',
    //        component: CoreDataAssetListComponent,
    //        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'standart.user', 'production.planner', 'production.manager', 'production.qc'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'create',
    //        component: CoreDataAssetCreateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc'] }
    //      },
    //      {
    //        canActivate: [AuthGuardService],
    //        path: 'update/:id',
    //        component: CoreDataAssetUpdateComponent,
    //        data: { roles: ['power.user', 'it.manager', 'production.planner', 'production.manager', 'production.qc'] }
    //      }
    //    ]
    //  },
    //  {
    //    canActivate: [AuthGuardService],
    //    path: 'settings/users/list',
    //    component: CoreDataSettingsUserListComponent,
    //    data: { roles: ['power.user', 'it.manager', 'management.ceo', 'coredata.admin'] }
    //  },
    //  {
    //    canActivate: [AuthGuardService],
    //    path: 'settings/users/roles/:userId',
    //    component: CoreDataUserRolesComponent,
    //    data: { roles: ['power.user', 'it.manager', 'management.ceo', 'coredata.admin'] }
    //  }
    //]
  }
];
