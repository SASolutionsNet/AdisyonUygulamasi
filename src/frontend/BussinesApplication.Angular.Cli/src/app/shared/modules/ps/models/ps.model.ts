import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../common/baseEntity';


/*import { PSCategory, PSCategoryService } from '../../pscategory/pscategory.service';*/

export interface PSCategoryConstantsEnum {
  code: string;
  name: string;
}
@Injectable()
export class PS extends BaseEntity {
  id: string = "";
  name: string = ""; 

  
}
