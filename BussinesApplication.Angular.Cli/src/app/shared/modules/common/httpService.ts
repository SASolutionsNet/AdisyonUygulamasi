import { Component, Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";

//import { environment } from '../../../../environments/environment';

import { BaseEntity } from './baseEntity';


@Injectable()
export class WebApiJsonResult {
  copyright: string = "";
  author: string = "";
  description: string = "";
  returnCode: number = 0;
  data: any = null;
  messages: string[] = [];
  errors: string[] = [];
}

@Injectable()
export class HttpServiceResult {
  success: boolean = false;
  response: Response | null = null;
  result: WebApiJsonResult | null = null;
  message: string = "";
  status: string = "";
}

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  handleResponse(response:any): HttpServiceResult {

    let httpServiceResult: HttpServiceResult = new HttpServiceResult();
    httpServiceResult.success = false;

    //if (!environment.production) {
    //  console.log('HttpService.handleResponse() - response: ', response);
    //}

    if (!response) {
      httpServiceResult.status = 'No Response From Http Service';

      this.handleError(response);

      return httpServiceResult;
    }
    else {
      httpServiceResult.status = response.status.toString();
      httpServiceResult.response = response;

      // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
      switch (response.status) {
        case 200: // OK
        case 201: // Created
        case 202: // Accepted
        case 203: // Non-Authoritative Information
        case 204: // No Content
        case 205: // Reset Content
        case 206: // Partial Content
          {
            let responseBody: WebApiJsonResult | null = null;

            let isWebApiJsonResultJson: boolean = false;

            try {
              responseBody = response.body;
              isWebApiJsonResultJson = true;
            }
            catch (exception) {
              isWebApiJsonResultJson = false;
            }

            if (isWebApiJsonResultJson) {
              httpServiceResult.result = responseBody;

              if (httpServiceResult.result) {
                if (httpServiceResult.result.returnCode == 0) {
                  httpServiceResult.success = true;
                }
                else if (httpServiceResult.result.returnCode == 3) {
                  // AuthorizationClaimError
                  httpServiceResult.success = false;
                  httpServiceResult.message = 'Oturum geçersiz. Çıkış yapıp tekrar girin.';
                }
                else if (httpServiceResult.result.returnCode == 4) {
                  // PermissionError
                  httpServiceResult.success = false;
                  httpServiceResult.message = 'Yetkiniz yok. Yetki gerekli ise bildirin.';
                }
                else {
                  // some other errors
                  httpServiceResult.success = false;
                  httpServiceResult.message = 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.';
                }
              }
              else {
                httpServiceResult.success = false;
                httpServiceResult.message = 'Response is NOT formatted as WebApiJsonResult';
                httpServiceResult.result = null;
              }
            }
            else {
              httpServiceResult.success = false;
              httpServiceResult.message = 'Response is Not formatted as JSON';
              httpServiceResult.result = null;
            }
            break;
          }
        default: {
          httpServiceResult.success = false;
          httpServiceResult.message = 'Sunucu hizmet hatası. İnternet bağlantınızı kontrol edip bir süre sonra tekrar deneyin.';
          httpServiceResult.result = null;
          break;
        }
      }

      if (!httpServiceResult.success) {
        this.handleError(response);
      }

      return httpServiceResult;
    }
  }

  handleError(response: Response | any): Observable<HttpServiceResult> {

    let httpServiceResult: HttpServiceResult = new HttpServiceResult();
    httpServiceResult.success = false;

    console.log('HttpService.handleError() - response: ' + response);

    if (response) {
      if (response instanceof Response) {
        httpServiceResult.status = response.status.toString();
        httpServiceResult.response = response;

        // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
        switch (response.status) {
          case 400: {
            // Bad Request
            httpServiceResult.message = 'Hatalı hizmet talebi.';
            break;
          }
          case 401: {
            // Unauthorized
            httpServiceResult.message = 'Yetki ya da izin yok. Çıkış yapıp tekrar girin.';
            break;
          }
          case 402: {
            // Reserved
            httpServiceResult.message = 'Reserved. Bildirin';
            break;
          }
          case 403: {
            // Forbidden
            httpServiceResult.message = 'Erişim yasak.';
            break;
          }
          case 404: {
            // Not Found
            httpServiceResult.message = 'Sunucuda böyle bir hizmet yok. Bildirin';
            break;
          }
          case 405: {
            // Method Not Allowed
            httpServiceResult.message = 'Sunucu bu hizmete izin vermiyor. Bildirin';
            break;
          }
          case 500: {
            // Internal Server Error
            httpServiceResult.message = 'Sunucu hizmeti hatası. Bildirin';
            break;
          }
          case 501: {
            // Not Implemented
            httpServiceResult.message = 'Sunucu hizmeti yok. Bildirin';
            break;
          }
          case 502: {
            // Bad Gateway
            httpServiceResult.message = 'Bad Gateway. Bildirin';
            break;
          }
          case 503: {
            // Service Unavailable
            httpServiceResult.message = 'Sunucu hizmeti yok. İnternet bağlantınızı kontrol edip bir süre sonra tekrar deneyin.';
            break;
          }
          case 504: {
            // Gateway Timeout
            httpServiceResult.message = 'Sunucu bağlantısında süre aşımı oldu. İnternet bağlantınızı kontrol edip bir süre sonra tekrar deneyin.';
            break;
          }
          case 505: {
            // HTTP Version Not Supported
            httpServiceResult.message = 'Sunucu ile iletişimde hata. Bildirin';
            break;
          }
          default: {
            httpServiceResult.message = 'Sunucu hizmet hatası. İnternet bağlantınızı kontrol edip bir süre sonra tekrar deneyin.';
            break;
          }
        }
      } else {
        httpServiceResult.message = 'HttpService.handleError(): ' + response.message ? response.message : response.toString();
      }
    }
    else {
      httpServiceResult.message = 'HttpService.handleError(): There was an error, but error object is null';
    }

    return throwError(() => new Error('Something went wrong: ' + Error));;
  }

  private handleErrorMessage(error: Response | any) {
    let errorMessage = this.getErrorMessage(error);

    // In a real world app, we might use a remote logging infrastructure
    console.error(errorMessage);
  }

  private getErrorMessage(error: Response | any): string {
    let errorMessage: string;
    if (error) {
      if (error instanceof Response) {
        let body = null;
        let err = null;

        let isJson: boolean = true;
        try {
          body = error.json();
        /*  err = body.error || JSON.stringify(body);*///1515151515
        }
        catch (exception) {
          console.log('HttpServiceResponseHandlerService.getErrorMessage(): error is not JSON');

          isJson = false;
        }

        if (!isJson) {
          body = error.text();

          err = body;
        }

        errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errorMessage = error.message ? error.message : error.toString();
      }
    }
    else {
      errorMessage = 'HttpServiceResponseHandlerService.getErrorMessage(): There was an error, but error object is null';
    }
    return errorMessage;
  }
}
