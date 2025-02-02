import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../../common/baseEntity';

import { PS } from '../../../ps/models/ps.model';
import { PSCategory } from '../../../pscategory/pscategory.service';
import { SalesAccounting } from '../../accounting/models/accounting.model';


@Injectable()
export class SalesOrder extends BaseEntity {


  billId: string = "";
  psId: string = "";
  quantity: number = 0 ;

  bill!: SalesAccounting;
  product!: PS;


}

