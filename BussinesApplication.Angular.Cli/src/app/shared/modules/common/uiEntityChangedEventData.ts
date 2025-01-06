import { Injectable } from '@angular/core';

@Injectable()
export class UIEntityChangedEventData {
  isValid: boolean = false;
  errors: any = null;
  data: any = null;
}
