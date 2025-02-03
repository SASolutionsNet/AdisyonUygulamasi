import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // Token'ı yerel depolama (localStorage) gibi bir yerde saklamak
  storeToken(token: string): void {
    localStorage.setItem('authToken', token); // Token'ı yerel depolamaya kaydediyor
  }

  // Token'ı almak
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Token'ı yerel depolamadan alır
  }

  // Token'ı temizlemek
  clearToken(): void {
    localStorage.removeItem('authToken'); // Yerel depolamadan token'ı siler
  }
}
