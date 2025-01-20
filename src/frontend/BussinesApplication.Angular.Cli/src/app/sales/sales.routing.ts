import { Routes } from '@angular/router';

//import { AuthGuardService } from '../shared/modules/auth/auth-guard.service';

//import { CustomerListComponent } from './customer/list/list.component';
//import { CustomerCreateComponent } from './customer/create/create.component';
//import { CustomerUpdateComponent } from './customer/update/update.component';
//import { CustomerContactPersonListComponent } from './customer/contactperson/list/list.component';
//import { CustomerContactPersonCreateComponent } from './customer/contactperson/create/create.component';

//import { SalesCustomerMeetingFormCreateComponent } from './customermeetingform/create/customermeetingform.create.component';
//import { SalesCustomerMeetingFormUpdateComponent } from './customermeetingform/update/customermeetingform.update.component';
//import { SalesCustomerMeetingFormListAllComponent } from './customermeetingform/list/customermeetingform.list.component';
//import { SalesCustomerMeetingFormListStateComponent } from './customermeetingform/list/state/list.state.component';

//import { SalesPSPriceListComponent } from './psprice/list/psprice.list.component';

//import { SalesOfferListAllComponent } from './offer/list/list.component';
//import { SalesOfferListStateComponent } from './offer/list/state/list.state.component';
//import { SalesOfferUpdateComponent } from './offer/update/update.component';
//import { SalesOfferCloneComponent } from './offer/clone/clone.component';

//import { SalesOrderListAllComponent } from './order/list/list.component';
//import { SalesOrderUpdateComponent } from './order/update/update.component';
//import { SalesOrderPaymentsWaitingListBySalesPersonComponent } from './order/payments/payments.list.component';

//import { SalesReportListAllComponent } from './report/sales.report.list.component';
//import { SalesReportCompanyRevenueGraphInYearComponent } from './report/company-revenue-graph-in-selected-year/report.component';
//import { SalesReportCompanyRevenueMonthlyGraphInYearComponent } from './report/company-revenue-monthly-graph-in-selected-year/report.component';
//import { SalesReportSalesPersonRevenueGraphInYearComponent } from './report/salesperson-revenue-graph-in-selected-year/report.component';
//import { SalesReportSalesPersonRevenueTableMonthlyInYearComponent } from './report/salesperson-revenue-table-monthly-in-selected-year/report.component';
//import { SalesReportPSGroupedRevenueTableInYearComponent } from './report/ps-grouped-revenue-table-in-selected-year/report.component';
//import { SalesReportStateGroupedRevenueTableInYearComponent } from './report/state-grouped-revenue-table-in-selected-year/report.component';
//import { SalesReportCountryGroupedRevenueTableInYearComponent } from './report/country-grouped-revenue-table-in-selected-year/report.component';
//import { SalesReportCustomerGroupedRevenueTableInYearComponent } from './report/customer-grouped-revenue-table-in-selected-year/report.component';

//import { SalesModuleSettingsUserListComponent } from './settings/users/list/list.component';
//import { SalesModuleUserRolesComponent } from './settings/users/roles/roles.component';

export const SalesRoutes: Routes = [
  {
//    path: '',
//    children: [
//      {
//        canActivate: [AuthGuardService],
//        path: 'customer/list',
//        component: CustomerListComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customer/create',
//        component: CustomerCreateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customer/update/:customerId',
//        component: CustomerUpdateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customer/contactperson/list/:customerId',
//        component: CustomerContactPersonListComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customer/contactperson/create/:customerId',
//        component: CustomerContactPersonCreateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customermeetingform/create',
//        component: SalesCustomerMeetingFormCreateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customermeetingform/update/:id',
//        component: SalesCustomerMeetingFormUpdateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customermeetingform/list',
//        component: SalesCustomerMeetingFormListAllComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'customermeetingform/list/state/:stateId',
//        component: SalesCustomerMeetingFormListStateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'psprice/list',
//        component: SalesPSPriceListComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'offer/update/:id',
//        component: SalesOfferUpdateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager', 'production.planner'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'offer/clone/:id',
//        component: SalesOfferCloneComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'offer/list',
//        component: SalesOfferListAllComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'offer/list/state/:stateId',
//        component: SalesOfferListStateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager', 'production.planner', 'production.manager', 'production.qc'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'order/list',
//        component: SalesOrderListAllComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'order/update/:id',
//        component: SalesOrderUpdateComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'order/payments',
//        component: SalesOrderPaymentsWaitingListBySalesPersonComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/list',
//        component: SalesReportListAllComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/company-revenue-graph-in-selected-year',
//        component: SalesReportCompanyRevenueGraphInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/company-revenue-monthly-graph-in-selected-year',
//        component: SalesReportCompanyRevenueMonthlyGraphInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/salesperson-revenue-graph-in-selected-year',
//        component: SalesReportSalesPersonRevenueGraphInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/salesperson-revenue-table-monthly-in-selected-year',
//        component: SalesReportSalesPersonRevenueTableMonthlyInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/ps-grouped-revenue-table-in-selected-year',
//        component: SalesReportPSGroupedRevenueTableInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/state-grouped-revenue-table-in-selected-year',
//        component: SalesReportStateGroupedRevenueTableInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/country-grouped-revenue-table-in-selected-year',
//        component: SalesReportCountryGroupedRevenueTableInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'report/customer-grouped-revenue-table-in-selected-year',
//        component: SalesReportCustomerGroupedRevenueTableInYearComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.user', 'sales.manager', 'sales.director', 'project.designer', 'project.manager'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'settings/users/list',
//        component: SalesModuleSettingsUserListComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.admin'] }
//      },
//      {
//        canActivate: [AuthGuardService],
//        path: 'settings/users/roles/:userId',
//        component: SalesModuleUserRolesComponent,
//        data: { roles: ['power.user', 'it.manager', 'management.ceo', 'sales.admin'] }
//      }
//    ]
  }
];
