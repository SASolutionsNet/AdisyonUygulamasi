import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";


/*import { environment } from '../../../../../../environments/environment';*/

import { WebApiJsonResult, HttpServiceResult, HttpService } from '../../../common/httpService';
import { ValueFormatterService } from '../../../common/value.formatter.service';
import { ValidationError } from '../../../common/validationError';

import { AuthService } from '../../../auth/auth.service';

import { QueryOptions } from '../../../common/QueryOptions';

@Injectable()
export class SalesOrderService {

  constructor(private http: HttpClient, private httpService: HttpService, private authService: AuthService,
    private valueFormatterService: ValueFormatterService) {
  }

 
}
