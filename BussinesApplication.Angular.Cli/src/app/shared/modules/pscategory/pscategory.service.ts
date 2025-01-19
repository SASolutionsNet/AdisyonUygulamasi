import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";

/*import { environment } from '../../../../environments/environment';*/

import { BaseEntity } from '../common/baseEntity';
import { WebApiJsonResult, HttpServiceResult, HttpService } from '../common/httpService';

import { PS } from '../ps/models/ps.model';
import { PSService } from '../ps/services/ps.service';


export interface PSCategoryConstantsEnum {
  code: string;
  name: string;
}


@Injectable()
export class PSCategory extends BaseEntity {
  id: string = "";

  name: string = "";
 
}

@Injectable()
export class PSCategoryService {
 /* constructor(private http: HttpClient, private httpService: HttpService, private authService: AuthService) {*/
    constructor(private http: HttpClient, private httpService: HttpService) {
  }



  //getList(queryOptions: QueryOptions): Observable<HttpServiceResult> {
  //  let headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
  //  });
  //  let options = { headers, observe: 'response' as 'response' };

  //  return this.http.get(
  //    environment.urls.popsep + "/api/pscategory/options/" + JSON.stringify(queryOptions),
  //    options)
  //    .map((response) => {
  //      let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

  //      return httpServiceResult;
  //    })
  //    .catch((error) => {
  //      return this.httpService.handleError(error);
  //    });
  //}

  //getCount(): Observable<HttpServiceResult> {
  //  let headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
  //  });
  //  let options = { headers, observe: 'response' as 'response' };

  //  return this.http.get(
  //    environment.urls.popsep + "/api/pscategory/count",
  //    options)
  //    .map((response) => {
  //      let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

  //      return httpServiceResult;
  //    })
  //    .catch((error) => {
  //      return this.httpService.handleError(error);
  //    });
  //}

  //getPSCount(psCategoryId: string): Observable<HttpServiceResult> {
  //  let headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
  //  });
  //  let options = { headers, observe: 'response' as 'response' };

  //  return this.http.get(
  //    environment.urls.popsep + "/api/pscategory/" + psCategoryId + "/ps/count",
  //    options)
  //    .map((response) => {
  //      let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

  //      return httpServiceResult;
  //    })
  //    .catch((error) => {
  //      return this.httpService.handleError(error);
  //    });
  //}

  //getById(id: string): Observable<HttpServiceResult> {
  //  let headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
  //  });
  //  let options = { headers, observe: 'response' as 'response' };

  //  return this.http.get(
  //    environment.urls.popsep + "/api/pscategory/" + id,
  //    options)
  //    .map((response) => {
  //      let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

  //      return httpServiceResult;
  //    })
  //    .catch((error) => {
  //      return this.httpService.handleError(error);
  //    });
  //}

  //create(entity: PSCategory): Observable<HttpServiceResult> {
  //   https://www.metaltoad.com/blog/angular-2-using-http-service-write-data-api
  //  let headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
  //  });
  //  let options = { headers, observe: 'response' as 'response' };

  //  http://stackoverflow.com/questions/40618878/angular-2-http-post-null-web-api-core
  //  var body = entity;

  //  return this.http.post(
  //    environment.urls.popsep + "/api/pscategory",
  //    body,
  //    options)
  //    .map((response) => {
  //      let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

  //      return httpServiceResult;
  //    })
  //    .catch((error) => {
  //      return this.httpService.handleError(error);
  //    });
  //}

  //update(entity: PSCategory): Observable<HttpServiceResult> {
  //   https://www.metaltoad.com/blog/angular-2-using-http-service-write-data-api
  //  let headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
  //  });
  //  let options = { headers, observe: 'response' as 'response' };

  //  http://stackoverflow.com/questions/40618878/angular-2-http-post-null-web-api-core
  //  var body = entity;

  //  return this.http.put(
  //    environment.urls.popsep + "/api/pscategory",
  //    body,
  //    options)
  //    .map((response) => {
  //      let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

  //      return httpServiceResult;
  //    })
  //    .catch((error) => {
  //      return this.httpService.handleError(error);
  //    });
  //}

  //createPSs(psCategoryId: string): Observable<HttpServiceResult> {
  //   https://www.metaltoad.com/blog/angular-2-using-http-service-write-data-api
  //  let headers = new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
  //  });
  //  let options = { headers, observe: 'response' as 'response' };

  //  http://stackoverflow.com/questions/40618878/angular-2-http-post-null-web-api-core
  //  var body = null;

  //  return this.http.post(
  //    environment.urls.popsep + "/api/pscategory/" + psCategoryId + "/ps",
  //    body,
  //    options)
  //    .map((response) => {
  //      let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

  //      return httpServiceResult;
  //    })
  //    .catch((error) => {
  //      return this.httpService.handleError(error);
  //    });
  //}
}
