import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../common/baseEntity';
import { Category } from '../../pscategory/pscategory.service';


/*import { PSCategory, PSCategoryService } from '../../pscategory/pscategory.service';*/

export interface PSCategoryConstantsEnum {
  code: string;
  name: string;
}
@Injectable()
export class Product extends BaseEntity {
 
name: string = "";
price: number = 0;
isFavorite: boolean = false;
categoryId: string = "";
categoryCode: string = "";

}
