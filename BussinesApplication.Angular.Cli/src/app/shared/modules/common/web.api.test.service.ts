import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";

import { environment } from '../../../../environments/environment';

import { BaseEntity } from './baseEntity';
import { WebApiJsonResult, HttpServiceResult, HttpService } from './httpService';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class WebApiTestEntity {
  id: string = null;

  description: string = null;
}

@Injectable()
export class WebApiTestService {
  constructor(private http: HttpClient, private httpService: HttpService, private authService: AuthService) {
  }

  get(httpresulttype: string): Observable<HttpServiceResult> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
    });
    let options = { headers, observe: 'response' as 'response' };

    let url = httpresulttype == null ? environment.urls.popsep + "/api/nonexistingurl/" : environment.urls.popsep + "/api/test/" + httpresulttype;

    return this.http.get(
      url,
      options)
      .map((response) => {
        let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

        return httpServiceResult;
      })
      .catch((error) => {
        return this.httpService.handleError(error);
      });
  }

  create(httpresulttype: string, entity: WebApiTestEntity): Observable<HttpServiceResult> {
    // https://www.metaltoad.com/blog/angular-2-using-http-service-write-data-api
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
    });
    let options = { headers, observe: 'response' as 'response' };

    //http://stackoverflow.com/questions/40618878/angular-2-http-post-null-web-api-core
    let body = entity;

    let url = environment.urls.popsep + "/api/test/" + httpresulttype;

    return this.http.post(
      url,
      body,
      options)
      .map((response) => {
        let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

        return httpServiceResult;
      })
      .catch((error) => {
        return this.httpService.handleError(error);
      });
  }

  update(httpresulttype: string, entity: WebApiTestEntity): Observable<HttpServiceResult> {
    // https://www.metaltoad.com/blog/angular-2-using-http-service-write-data-api
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token
    });
    let options = { headers, observe: 'response' as 'response' };

    //http://stackoverflow.com/questions/40618878/angular-2-http-post-null-web-api-core
    let body = entity;

    let url = environment.urls.popsep + "/api/test/" + httpresulttype;

    return this.http.put(
      url,
      body,
      options)
      .map((response) => {
        let httpServiceResult: HttpServiceResult = this.httpService.handleResponse(response);

        return httpServiceResult;
      })
      .catch((error) => {
        return this.httpService.handleError(error);
      });
  }
}
