import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../../../../environments/environment';






@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private apiUrl = `${environment.apiUrl}/Order`;
  constructor(
    private http: HttpClient) {
  }




  // Token'ı almak
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Token'ı yerel depolamadan alır
  }

  // Tüm siparişleri alma
  getAllOrders(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile tüm siparişleri al
    return this.http.get(`${this.apiUrl}/get-all`, { headers });
  }

  // Bir fatura için tüm siparişleri alma
  getAllOrdersForBill(id: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    //GET isteği ile tüm siparişleri al
    return this.http.get(`${this.apiUrl}/get-orders-for-bill/?id=${id}`, { headers });
  }
  // Yeni sipariş oluşturma
  createOrder(orderData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile yeni sipariş oluştur
    return this.http.post(`${this.apiUrl}/create`, orderData, { headers });
  }

  // Yeni siparişler oluşturma (Liste alacak şekilde güncellendi)
  addOrders(orderDataList: any[]): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile yeni siparişleri oluştur
    return this.http.post(`${this.apiUrl}/create-range`, orderDataList, { headers });
  }

  // Yeni siparişler oluşturma (Liste alacak şekilde güncellendi)
  printOrders(orderList: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile yeni siparişleri oluştur
    return this.http.post(`${this.apiUrl}/print`, orderList, { headers });
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



  // Yeni siparişler oluşturma (Liste alacak şekilde güncellendi)
  delete_range(orderDataList: any[]): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile yeni siparişleri oluştur
    return this.http.delete(`${this.apiUrl}/delete-range/${orderDataList}`, { headers });
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
