import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PS } from '../models/ps.model';
import { HttpService, HttpServiceResult } from '../../common/httpService';


@Injectable({
  providedIn: 'root'
})
export class PSService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,) {
  }


  private apiUrl = 'http://localhost:5025/api/Product'; // API URL'si


  //getPS(): Observable<PS[]> {
    
  //}

  getPSById(id: number): Observable<PS> {
    return this.http.get<PS>(`${this.apiUrl}/${id}`);
  }
}
