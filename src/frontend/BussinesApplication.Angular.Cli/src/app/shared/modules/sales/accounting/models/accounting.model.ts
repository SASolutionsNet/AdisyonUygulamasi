import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../../common/baseEntity';
import { Orders, SalesOrder } from '../../order/models/order.model';


@Injectable()
export class SalesAccounting extends BaseEntity {
  table: string = "";
  orders: Orders[] = []
  totalPrice: number = 0;
  isClosed: boolean = false;
}

