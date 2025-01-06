import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatButtonToggleModule } from '@angular/material';


//import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

//import { PartyService } from '../shared/modules/party/party.service';

//import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';
//import { PSService } from '../shared/modules/ps/services/ps.service';
//import { PSFeatureValueService } from '../shared/modules/psfeaturevalue/services/psfeaturevalue.service';

//import { SalesCustomerMeetingFormService } from '../shared/modules/sales/customermeetingform/services/customermeetingform.service';
//import { SalesOfferService } from '../shared/modules/sales/offer/services/offer.service';

//import { UserService } from '../shared/modules/user/services/user.service';
//import { ProcurementPurchaseOrderItemService } from '../shared/modules/procurement/purchaseorderitem/services/purchaseorderitem.service';
//import { SalesOrderService } from '../shared/modules/sales/order/services/order.service';
//import { AccountingETACurrentBalanceService } from '../shared/modules/accountingetacurrentbalance/services/accountingetacurrentbalance.service';
//import { AccountingETACurrentBalanceModule } from '../shared/modules/accountingetacurrentbalance/accountingetacurrentbalance.module';
//import { AccountingETATrialBalanceModule } from '../shared/modules/accountingetatrialbalance/accountingetatrialbalance.module';
//import { AccountingETATrialBalanceService } from '../shared/modules/accountingetatrialbalance/services/accountingetatrialbalance.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    //MatIconModule,
    //MatCardModule,
    //MatButtonModule,
    //MatButtonToggleModule,
    //MatListModule,
    //MatProgressBarModule,
    //MatMenuModule,
    //ChartsModule,
    //NgxDatatableModule,
    //FlexLayoutModule,

    //AccountingETACurrentBalanceModule,
    //AccountingETATrialBalanceModule
  ],
  declarations: [
    DashboardComponent
  ],
  // services, pipes and providers
  providers: [
    //PartyService,
    //PSCategoryService,
    //PSService,
    //PSFeatureValueService,
    //SalesCustomerMeetingFormService,
    //SalesOfferService,
    //SalesOrderService,
    //ProcurementPurchaseOrderItemService,
    //AccountingETACurrentBalanceService,
    //AccountingETATrialBalanceService,
    //UserService
  ]
})

export class DashboardModule { }
