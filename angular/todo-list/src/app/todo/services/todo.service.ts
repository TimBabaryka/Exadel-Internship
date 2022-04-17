import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  addNewCard$ = new Subject();
  constructor(private http: HttpClient) {}
  getCardDatas() {
    return this.http.get('http://localhost:3000/api/user', {});
  }
  getAdminData() {
    return this.http.get('http://localhost:3000/api/users', {});
  }

  addCard(cardName: string, currency: string, cardAmount: number) {
    return this.http.post('http://localhost:3000/api/createCard', {
      cardName,
      currency,
      cardAmount,
    });
  }
}
