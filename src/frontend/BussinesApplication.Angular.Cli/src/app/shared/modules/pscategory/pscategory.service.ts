import { Component, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";


import { BaseEntity } from '../common/baseEntity';
import { WebApiJsonResult, HttpServiceResult, HttpService } from '../common/httpService';

import { PSService } from '../ps/services/ps.service';
import { Product } from '../ps/models/ps.model';


export interface CategoryConstantsEnum {
  code: string;
  name: string;
}


@Injectable()
export class Category extends BaseEntity {

  products: Product[] = [];
  categoryCode: string = "";
  name: string = "";
 
}

@Injectable()
export class PSCategoryService {
 
  private apiUrl = 'http://localhost:5025/api/Category'; // API URL'sini buraya ekleyin
  constructor(
    private http: HttpClient) {
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
  updateCategory(categoryId: string, categoryData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // PUT isteği ile kategori güncelle
    return this.http.put(`${this.apiUrl}/update/${categoryId}`, categoryData, { headers });
  }
  // Kategoriyi silme
  deleteCategory(categoryId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // DELETE isteği ile kategori sil
    return this.http.delete(`${this.apiUrl}/delete/${categoryId}`, { headers });
  }
  // Kategori bilgilerini ID'ye göre almak
  getCategoryById(categoryId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan al

    // Eğer token varsa, Authorization header'ına ekle
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // GET isteği ile kategori bilgilerini al
    return this.http.get(`${this.apiUrl}/get-by-id/${categoryId}`, { headers });
  }
}
