import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  activeId: any;
  activeTransaction: any;
  addNewCategory$ = new Subject();
  addNewCard$ = new Subject();
  addNewTransaction$ = new Subject();
  deleteTransactions$ = new Subject();
  constructor(private http: HttpClient) {}

  setActiveId(data: any) {
    this.activeId = data;
  }

  getActiveId() {
    return this.activeId;
  }

  setActiveTrans(data: any) {
    this.activeTransaction = data;
  }
  getActiveTrans() {
    return this.activeTransaction;
  }

  deleteCategory(id: string) {
    return this.http
      .delete(`http://localhost:3000/api/deleteCategory/${id}`)
      .subscribe(() => {
        this.addNewCategory$.next(null);
      });
  }

  deleteTransaction(id: string) {
    return this.http
      .delete(`http://localhost:3000/api/deleteTransaction/${id}`)
      .subscribe(() => {
        this.deleteTransactions$.next(null);
      });
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

  addCategory(categoryName: string, categoryType: string, cardId: string) {
    return this.http.post('http://localhost:3000/api/createCategory', {
      categoryName,
      categoryType,
      cardId,
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
