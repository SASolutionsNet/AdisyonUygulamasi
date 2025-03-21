import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";
import { WebApiJsonResult, HttpServiceResult, HttpService } from '../../../common/httpService';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesAccountingService {
  private apiUrl = `${environment.apiUrl}/Bill`;
  constructor(private http: HttpClient) {
  }

  // Tüm faturaları almak
  getAllBills(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile faturaları al
    return this.http.get(`${this.apiUrl}/get-all`, { headers });
  }

  getAllClosedBills(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile faturaları al
    return this.http.get(`${this.apiUrl}/get-all-closed-tables`, { headers });
  }

  getAllOpenBills(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile faturaları al
    return this.http.get(`${this.apiUrl}/get-all-open-tables`, { headers });
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
  updateBill(bill: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // PUT isteği ile faturayı güncelle
    return this.http.put(`${this.apiUrl}/update`, bill, { headers });
  }
  // Fatura silme
  deleteBill(billId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // DELETE isteği ile faturayı sil
    return this.http.delete(`${this.apiUrl}/delete/`, { headers, body: { id: billId } });
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
