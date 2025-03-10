import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";


/*import { environment } from '../../../../../../environments/environment';*/

import { WebApiJsonResult, HttpServiceResult, HttpService } from '../../../common/httpService';

@Injectable({
  providedIn: 'root'
})
export class SalesAccountingService {
  private apiUrl = 'http://localhost:5025/api/Bill'; // API URL'sini buraya ekleyin
  constructor(private http: HttpClient ) {
  }

  // Tüm faturaları almak
  getAllBills(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile faturaları al
    return this.http.get(`${this.apiUrl}/get-all`, { headers });
  }
  // Yeni bir fatura oluşturma
  createBill(bill: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile yeni fatura oluştur
    return this.http.post(`${this.apiUrl}/create`, bill, { headers });
  }
  // Fatura güncelleme
  updateBill(billId: string, bill: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // PUT isteği ile faturayı güncelle
    return this.http.put(`${this.apiUrl}/update/${billId}`, bill, { headers });
  }
  // Fatura silme
  deleteBill(billId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // DELETE isteği ile faturayı sil
    return this.http.delete(`${this.apiUrl}/delete/${billId}`, { headers });
  }
  // Fatura ID'ye göre detaylarını alma
  getBillById(billId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile faturanın detaylarını al
    return this.http.get(`${this.apiUrl}/get-by-id/${billId}`, { headers });
  }
}
