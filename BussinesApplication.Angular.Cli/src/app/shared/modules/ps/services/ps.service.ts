import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PS } from '../models/ps.model';
import { HttpService } from '../../common/httpService';
import { ValueFormatterService } from '../../common/value.formatter.service';


@Injectable({
  providedIn: 'root'
})
export class PSService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  /*  private authService: AuthService,*/
    private valueFormatterService: ValueFormatterService) {
  }


  private apiUrl = 'https://localhost:5001/api/ps'; // API URL'si


  getPS(): Observable<PS[]> {
    return this.http.get<PS[]>(this.apiUrl);
  }

  getPSById(id: number): Observable<PS> {
    return this.http.get<PS>(`${this.apiUrl}/${id}`);
  }
}
