import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  getCardDatas() {
    return this.http.get('http://localhost:3000/api/user', {});
  }
}
