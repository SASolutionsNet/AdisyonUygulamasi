import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root', // Bu servis 'root' seviyesinde sağlanacak
})
export class UserService {
  private apiUrl = 'http://localhost:5025/api/User'; // API URL

  constructor(private http: HttpClient) { }

  // Login metodu: Kullanıcı adı ve şifre ile giriş yapar
  login(email: string, password: string): Observable<any> {
    const body = { email, password }; // Gönderilecek veri
    return this.http.post(`${this.apiUrl}/login`, body); // POST isteği gönder
  }

  // Kullanıcı kaydı için register metodu
  register(email: string, password: string, username: string): Observable<any> {
    const body = {  email, password, username }; // Gönderilecek veri
    return this.http.post(`${this.apiUrl}/register`, body, { // POST isteği gönder
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Token'ı yerel depolama (localStorage) gibi bir yerde saklamak
  storeToken(token: string): void {
    localStorage.setItem('authToken', token); // Token'ı yerel depolamaya kaydediyor
  }
  // Token'ı temizlemek
  clearToken(): void {
    localStorage.removeItem('authToken'); // Yerel depolamadan token'ı siler
  }
  // Token'ı almak
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Token'ı yerel depolamadan alır
  }


  // Mevcut kullanıcının bilgilerini almak için current-user metodu
  getCurrentUser(): Observable<any> {
    // LocalStorage'dan token'ı alıyoruz
    const token = localStorage.getItem('authToken');

    // Eğer token varsa, Authorization header'ına ekliyoruz
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/current-user`, { headers });
  }
  // Kullanıcı çıkış yapma işlemi
  logout(): Observable<any> {
    const token = this.getToken(); // LocalStorage'dan token'ı alıyoruz
    if (!token) {
      // Eğer token yoksa, hemen observable döndürelim
      return new Observable(observer => observer.next(null));
    }

    // Authorization header'ını ekliyoruz
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      // Çıkış yapıldığında token'ı sil
      tap(() => {
        localStorage.removeItem('authToken'); // Token'ı yerel depolamadan sil
      })
    );
  }
  // Şifre değiştirme işlemi
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const token = this.getToken(); // LocalStorage'dan token'ı alıyoruz
    if (!token) {
      // Eğer token yoksa, hemen observable döndürelim
      return new Observable(observer => observer.next(null));
    }

    // Authorization header'ını ekliyoruz
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Şifre değişikliği için gerekli veriyi gönderiyoruz
    const body = {
      oldPassword,
      newPassword
    };

    return this.http.post(`${this.apiUrl}/change-password`, body, { headers });
  }
}
