import { Routes } from '@angular/router';


import { CoreDataPSCategoryListComponent } from './pscategory/list/pscategory.list.component';
import { CoreDataPSCategoryCreateComponent } from './pscategory/create/pscategory.create.component';
import { CoreDataPSCategoryUpdateComponent } from './pscategory/update/pscategory.update.component';

import { CoreDataPSListComponent } from './ps/list/ps.list.component';
import { CoreDataPSCreateComponent } from './ps/create/ps.create.component';
import { CoreDataPSUpdateComponent } from './ps/update/ps.update.component';


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
