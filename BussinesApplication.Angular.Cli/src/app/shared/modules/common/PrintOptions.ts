import { Injectable } from '@angular/core';

@Injectable()
export class PrintOptions {
  leftMargin: number = 0.15;
  rightMargin: number = 0.15;
  topMargin: number = 0.15;
  bottomMargin: number = 0.15;

  scale: number = 100;

  fitToPage: boolean = false;

  isLandscape: boolean = false;

  paperType: string = "A4";
}
