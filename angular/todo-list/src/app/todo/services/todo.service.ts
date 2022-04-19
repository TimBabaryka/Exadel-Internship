import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  activeId: any;
  addNewCard$ = new Subject();
  constructor(private http: HttpClient) {}

  setActiveId(data: any) {
    this.activeId = data;
  }

  getActiveId() {
    return this.activeId;
  }

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
  addTransaction(
    description: string,
    payee: string,
    date: string,
    activity: string,
    amount: number,
    paidCard: string,
    typeOfTransaction: string
  ) {
    return this.http.post('http://localhost:3000/api/createTransaction', {
      description,
      payee,
      date,
      activity,
      amount,
      paidCard,
      typeOfTransaction,
    });
  }
}
