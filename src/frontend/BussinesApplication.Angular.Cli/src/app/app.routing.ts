import { Routes, RouterModule, } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppHomeComponent } from './home/app-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { CoreDataPSCategoryCreateComponent } from './coredata/pscategory/create/pscategory.create.component';
import { LoginComponent } from './user/login/user.login.component';
import { RegisterComponent } from './user/register/user.register.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'user/login',
    component: LoginComponent

  },
  {
    path: 'user/register',
    component: RegisterComponent

  },
  {
    path: 'home',
    component: AppHomeComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),

      }, {
        path: 'coredata',
        loadChildren: () => import('./coredata/coredata.module').then(m => m.CoreDataModule)
      }, {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
      }
      , {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: 'session/404'
  }
];
/*export const RoutingModule = RouterModule.forRoot(AppRoutes);*/
