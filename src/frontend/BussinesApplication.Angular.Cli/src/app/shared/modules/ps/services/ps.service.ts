import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService, HttpServiceResult } from '../../common/httpService';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PSService {
  private apiUrl = `${environment.apiUrl}/Product`; 

  constructor(
    private http: HttpClient) {
  }


 

  // Token'ı almak
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Token'ı yerel depolamadan alır
  }

  // Tüm ürünleri getirme
  getAllProducts(): Observable<any> {
    const token = this.getToken(); // LocalStorage'dan token'ı alıyoruz
    if (!token) {
      // Eğer token yoksa, hemen observable döndürelim
      return new Observable(observer => observer.next(null));
    }

    // Authorization header'ını ekliyoruz
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // API'ye GET isteği gönderiyoruz
    return this.http.get(`${this.apiUrl}/get-all`, { headers });
  }
  // Yeni ürün oluşturma
  createProduct(productData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile ürün oluştur
    return this.http.post(`${this.apiUrl}/create/`, productData , { headers});
  }
  // Ürünü güncelleme
  updateProduct( productData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // PUT isteği ile ürünü güncelle
    return this.http.put(`${this.apiUrl}/update/`, productData, { headers });
  }
  // Ürünü silme
  deleteProduct(product:any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // DELETE isteği ile ürünü sil
    return this.http.delete(`${this.apiUrl}/delete/`,  { headers, body: product });
  }
  // Ürünü ID ile getirme
  getProductById(id: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile ürünü getir
    return this.http.get(`${this.apiUrl}/get-by-id/?id=${id}`, { headers });
  }

  // Favori ürünleri getirme
  getFavorites(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile favori ürünleri al
    return this.http.get(`${this.apiUrl}/get-favorites`, { headers });
  }
}
