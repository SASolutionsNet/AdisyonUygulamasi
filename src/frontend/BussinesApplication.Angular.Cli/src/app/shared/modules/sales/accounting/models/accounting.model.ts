import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../../common/baseEntity';

import { Order } from '../components/detail/accounting.detail.component';
import { Orders, SalesOrder } from '../../order/models/order.model';


@Injectable()
export class SalesAccounting extends BaseEntity {

  table:    string = "";
  isClosed: boolean = false;
  orders: Orders[] = [];
}

