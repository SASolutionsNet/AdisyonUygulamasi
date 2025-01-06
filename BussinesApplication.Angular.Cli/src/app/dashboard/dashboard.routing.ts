import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

/*import { AuthGuardService } from '../shared/modules/auth/auth-guard.service';*/

export const DashboardRoutes: Routes = [{
    /*canActivate: [AuthGuardService],*/
    path: '',
    component: DashboardComponent,
    data: { roles: ['standart.user'] }
}];
