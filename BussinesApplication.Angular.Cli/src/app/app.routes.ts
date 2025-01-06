import { Routes } from '@angular/router';
import { AppHomeComponent } from './home/app-home.component';
import { AppAuthComponent } from './auth/app-auth.component';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
//import { AuthService } from './shared/modules/auth/auth.service';
//import { AuthGuardService } from './shared/modules/auth/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: AppHomeComponent
  },
  {
    path: 'auth',
    component: AppAuthComponent
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'coredata',
        loadChildren: () => import('./coredata/coredata.module').then(m => m.CoreDataModule)
      }, {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
      }
      
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];



//export const AppRoutes: Routes = [
//  {
//    path: 'home',
//    component: AppHomeComponent
//  },
//  {
//    path: 'auth',
//    component: AppAuthComponent
//  },
//  {
//    path: 'public',
//    loadChildren: './public/public.module#PublicModule'
//  },
//  {
//    path: '',
//    component: AdminLayoutComponent,
//    children: [
//      {
//        path: 'dashboard',
//        loadChildren: './dashboard/dashboard.module#DashboardModule'
//      }, {
//        path: 'coredata',
//        loadChildren: './coredata/coredata.module#CoreDataModule'
//      }, {
//        path: 'procurement',
//        loadChildren: './procurement/procurement.module#ProcurementModule'
//      }, {
//        path: 'sales',
//        loadChildren: './sales/sales.module#SalesModule'
//      }, {
//        path: 'production',
//        loadChildren: './production/production.module#ProductionModule'
//      }, {
//        path: 'inventory',
//        loadChildren: './inventory/inventory.module#InventoryModule'
//      }, {
//        path: 'shipment',
//        loadChildren: './shipment/shipment.module#ShipmentModule'
//      }, {
//        path: 'installation',
//        loadChildren: './installation/installation.module#InstallationModule'
//      }, {
//        path: 'maintenance',
//        loadChildren: './maintenance/maintenance.module#MaintenanceModule'
//      }, {
//        path: 'accounting',
//        loadChildren: './accounting/accounting.module#AccountingModule'
//      }, {
//        path: 'hr',
//        loadChildren: './hr/hr.module#HrModule'
//      }, {
//        path: 'it',
//        loadChildren: './it/it.module#ITModule'
//      }, {
//        path: 'management',
//        loadChildren: './management/management.module#ManagementModule'
//      }
//    ]
//  },
//  {
//    path: '**',
//    redirectTo: 'session/404'
//  }
//];
