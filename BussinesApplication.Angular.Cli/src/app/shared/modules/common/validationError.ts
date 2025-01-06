import { Component, Injectable } from '@angular/core';

@Injectable()
export class ValidationError {
  isValid: boolean = false;
  errorMessage: string = null;
  data: any = null;
}
