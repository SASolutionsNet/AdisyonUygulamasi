import { Routes } from '@angular/router';

import { PublicProcurementRFQBidUpdateComponent } from './procurement/rfq/bid/update/update.component';
import { PublicProcurementRequestMediaListComponent } from './procurement/request/media/list/list.component';
import { PublicProcurementPurchaseOrderViewComponent } from './procurement/po/view/view.component';
import { PublicSalesOfferViewDocumentsComponent } from './sales/offer/view/view.documents.component';

export const PublicRoutes: Routes = [
  {
    path: 'public/procurement/rfq/bid/update/:rfqBidId',
    component: PublicProcurementRFQBidUpdateComponent
  },
  {
    path: 'public/procurement/request/media/list/:procurementRequestId',
    component: PublicProcurementRequestMediaListComponent
  },
  {
    path: 'public/procurement/po/view/:id',
    component: PublicProcurementPurchaseOrderViewComponent
  },
  {
    path: 'public/sales/offer/view/documents/:id',
    component: PublicSalesOfferViewDocumentsComponent
  }
];
