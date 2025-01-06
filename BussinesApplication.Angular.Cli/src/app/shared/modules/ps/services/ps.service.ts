import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  id: number;
  title: string;
  imgurl: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class PSService {
  private apiUrl = 'https://localhost:5001/api/ps'; // API URL'si

  constructor(private http: HttpClient) { }

  getPosts(): Observable<PS[]> {
    return this.http.get<PS[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<PS> {
    return this.http.get<PS>(`${this.apiUrl}/${id}`);
  }
}
