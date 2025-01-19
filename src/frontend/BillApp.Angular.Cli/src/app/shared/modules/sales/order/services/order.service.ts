import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";


/*import { environment } from '../../../../../../environments/environment';*/

import { WebApiJsonResult, HttpServiceResult, HttpService } from '../../../common/httpService';

@Injectable()
export class SalesOrderService {

  constructor(private http: HttpClient, private httpService: HttpService ) {
  }

 
}
