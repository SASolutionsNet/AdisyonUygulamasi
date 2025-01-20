import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../../common/baseEntity';

import { PS } from '../../../ps/models/ps.model';
import { PSCategory } from '../../../pscategory/pscategory.service';


@Injectable()
export class SalesOrder extends BaseEntity {
  id: string="";
  name: string = "";


}

