import { Component, Injectable } from '@angular/core';

import { BaseEntity } from '../../common/baseEntity';


import { PSCategory, PSCategoryService } from '../../pscategory/pscategory.service';

export interface PSCategoryConstantsEnum {
  code: string;
  name: string;
}
@Injectable()
export class PS extends BaseEntity {
  id: string = null;

  universalId: string = null; // 36

  psTypeDiscriminator: string = null; // product or service // 64

  psCategoryId: string = null; // 36
  psCategory: PSCategory = null;

  amountSecondUnit: number;

  // IMPORTANT: added on 2019.07.20 
  weight: number = 0; // kg
  width: number = 0; // mm
  length: number = 0; // mm
  height: number = 0; // mm

  // IMPORTANT: added on 2019-12-23 for REQ-226
  weightNet: number = 0; // kg

  manufacturerProviderId: string = null; // 36
  manufacturerProvider: Party = null;

  name: string = null; // 256
  description: string = null; // 512
  descriptionShort: string = null; // 2048
  tags: string = null; // 512

  gtin: string = null; // 36

  brandId: string = null; // 36
  brand: Party = null; // 36

  modelName: string = null; // 64
  modelCode: string = null; // 64

  releaseDate: string = null; // max 19
  productionEndDate: string = null; // max 19
  supportEndDate: string = null; // max 19

  urlWeb: string = null;
  urlMobile: string = null;
  urlApi: string = null;

  imageSmallBase64: string = null;
  imageMediumBase64: string = null;
  imageLargeBase64: string = null;

  urlSmallImage: string = null;
  urlMediumImage: string = null;
  urlLargeImage: string = null;

  featureValues: PSFeatureValue[] = [];

  medias: PSMedia[] = [];
}
