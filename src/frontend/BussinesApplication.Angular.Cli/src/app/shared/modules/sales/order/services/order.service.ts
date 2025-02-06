import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";


/*import { environment } from '../../../../../../environments/environment';*/

import { WebApiJsonResult, HttpServiceResult, HttpService } from '../../../common/httpService';

@Injectable()
export class SalesOrderService {

  private apiUrl = 'http://localhost:5025/api/Order'; // API URL'sini buraya ekleyin
  constructor(private http: HttpClient) {
  }
  // Tüm siparişleri alma
  getAllOrders(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile tüm siparişleri al
    return this.http.get(`${this.apiUrl}/get-all`, { headers });
  }
  // Yeni sipariş oluşturma
  createOrder(orderData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile yeni sipariş oluştur
    return this.http.post(`${this.apiUrl}/create`, orderData, { headers });
  }
  // Siparişi güncelleme
  updateOrder(orderId: string, updatedData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // PUT isteği ile siparişi güncelle
    return this.http.put(`${this.apiUrl}/update/${orderId}`, updatedData, { headers });
  }
  // Siparişi silme
  deleteOrder(orderId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // DELETE isteği ile siparişi sil
    return this.http.delete(`${this.apiUrl}/delete/${orderId}`, { headers });
  }
  // Siparişi ID ile almak
  getOrderById(orderId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile siparişi ID'sine göre al
    return this.http.get(`${this.apiUrl}/get-by-id/${orderId}`, { headers });
  }
}
