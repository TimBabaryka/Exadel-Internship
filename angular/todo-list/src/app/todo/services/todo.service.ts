import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // activeCategoryId: any;
  activeId: any;
  // deleteCategory$ = new Subject();
  addNewCategory$ = new Subject();
  addNewCard$ = new Subject();
  addNewTransaction$ = new Subject();
  constructor(private http: HttpClient) {}

  setActiveId(data: any) {
    this.activeId = data;
  }
  // setActiveIdCat(data: any) {
  //   this.activeCategoryId = data;
  // }

  getActiveId() {
    return this.activeId;
  }

  deleteCategory(id: string) {
    return this.http
      .delete(`http://localhost:3000/api/deleteCategory/${id}`)
      .subscribe(() => {
        this.addNewCategory$.next(null);
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
