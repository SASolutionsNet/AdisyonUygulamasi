import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../../common/baseEntity';

import { Product } from '../../../ps/models/ps.model';
import { SalesAccounting } from '../../accounting/models/accounting.model';


@Injectable()
export class SalesOrder extends BaseEntity {

  table: string = "";

  billId: string = "";
  psId: string = "";
  quantity: number = 0;

  bill!: SalesAccounting;
  product!: Product;
  productName: string = "";
  cost: number = 0;
}

@Injectable()
export class Orders {
  id: string = "";
  table: string = "";
  quantity: number = 0;
  productName: string = "";
  price: number = 0;
  productId: string = "";
  billId: string = "";
  paid: boolean = false;
}
@Injectable()
export class ReportDetailOrders {
  productName: string = "";
  quantity: number = 0;
  cost: number = 0;
  createdDate: string = "";


}
