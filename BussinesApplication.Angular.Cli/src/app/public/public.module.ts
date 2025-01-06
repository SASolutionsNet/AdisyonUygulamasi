import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatNativeDateModule,
  MatDatepickerIntl
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { MatDatepickerIntlTr } from '../shared/datepicker/datepicker-intl-tr'

import { SharedModule } from '../shared/shared.module';
import { PricePipeTr } from '../shared/formatters/price-tr.pipe';

import { PublicRoutes } from './public.routing';
import { PublicProcurementRFQBidUpdateComponent } from './procurement/rfq/bid/update/update.component';
import { PublicProcurementRequestMediaListComponent } from './procurement/request/media/list/list.component';
import { PublicProcurementPurchaseOrderViewComponent } from './procurement/po/view/view.component';
import { PublicSalesOfferViewDocumentsComponent } from './sales/offer/view/view.documents.component';

import { UnitService } from '../shared/modules/unit/unit.service';

import { PartyModule } from '../shared/modules/party/party.module';
import { PartyService } from '../shared/modules/party/party.service';

import { PSCategoryModule } from '../shared/modules/pscategory/pscategory.module';
import { PSCategoryService } from '../shared/modules/pscategory/pscategory.service';

import { ProcurementRequestModule } from '../shared/modules/procurement/request/procurementrequest.module';
import { ProcurementRequestService } from '../shared/modules/procurement/request/procurementrequest.service';
import { ProcurementRFQService } from '../shared/modules/procurement/rfq/procurementrfq.service';
import { ProcurementPurchaseOrderService } from '../shared/modules/procurement/purchaseorder/purchaseorder.service';

import { SalesOfferModule } from '../shared/modules/sales/offer/offer.module';
import { SalesOfferService } from '../shared/modules/sales/offer/services/offer.service';
import { PurchaseOrderItemModule } from '../shared/modules/procurement/purchaseorderitem/purchaseorderitem.module';
import { ProcurementPurchaseOrderItemService } from '../shared/modules/procurement/purchaseorderitem/services/purchaseorderitem.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicRoutes),
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,

    SharedModule,
    PartyModule,
    PSCategoryModule,
    ProcurementRequestModule,
    PurchaseOrderItemModule,
    SalesOfferModule
  ],
  declarations: [
    PublicProcurementRFQBidUpdateComponent,
    PublicProcurementRequestMediaListComponent,
    PublicProcurementPurchaseOrderViewComponent,
    PublicSalesOfferViewDocumentsComponent
  ],
  // services, pipes and providers
  providers: [
    // https://stackoverflow.com/questions/34904683/how-to-set-locale-in-datepipe-in-angular2
    // https://stackoverflow.com/questions/34904683/how-to-set-locale-in-datepipe-in-angular2/39344889
    { provide: LOCALE_ID, useValue: "tr-TR" },
    PricePipeTr,

    UnitService,
    PartyService,
    PSCategoryService,
    ProcurementRequestService,
    ProcurementRFQService,
    ProcurementPurchaseOrderItemService,
    ProcurementPurchaseOrderService,
    SalesOfferService
  ]
})

export class PublicModule { }
