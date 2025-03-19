import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


import { BaseEntity } from '../common/baseEntity';

import { PSService } from '../ps/services/ps.service';
import { Product } from '../ps/models/ps.model';
import { environment } from '../../../../environments/environment';


export interface CategoryConstantsEnum {
  code: string;
  name: string;
}


@Injectable()
export class Category extends BaseEntity {

  
  categoryCode: string = "";
  name: string = "";
 
}
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CategoryService {
 
  private apiUrl = `${environment.apiUrl}/Category`; 

  constructor(private http: HttpClient) { }


  // Token'ı almak
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Token'ı yerel depolamadan alır
  }

  // Tüm kategorileri getirme
  getAllCategories(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile tüm kategorileri al
    return this.http.get(`${this.apiUrl}/get-all`, { headers });
  }

  // Yeni kategori oluşturma
  createCategory(categoryData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // POST isteği ile yeni kategori oluştur
    return this.http.post(`${this.apiUrl}/create`, categoryData, { headers });
  }
  // Kategoriyi güncelleme
  updateCategory( categoryData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // PUT isteği ile kategori güncelle
    return this.http.put(`${this.apiUrl}/update/`, categoryData, { headers });
  }
  // Kategoriyi silme
  deleteCategory(categoryData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // DELETE isteği ile kategori sil
    return this.http.delete(`${this.apiUrl}/delete/`, { headers, body: categoryData });
  }
  // Kategori bilgilerini ID'ye göre almak
  getCategoryById(id: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    // GET isteğini headers ve params ile gönder
    return this.http.get(`${this.apiUrl}/get-by-id/?id=${id}`, { headers });
  }



}

