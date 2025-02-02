import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../../common/baseEntity';

import { PS } from '../../../ps/models/ps.model';
import { PSCategory } from '../../../pscategory/pscategory.service';
import { Order } from '../components/detail/accounting.detail.component';
import { SalesOrder } from '../../order/models/order.model';


@Injectable()
export class SalesAccounting extends BaseEntity {

  table:    string = "";
  isClosed: boolean = false;
  orders:   SalesOrder[]= []

}

