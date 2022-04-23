import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  categoriesTotal!: number;
  cardsTotal!: number;
  cardsTotalSum!: number;
  transactionMade!: number;
  totalExpense!: number;
  totalIncome!: number;

  admin!: any;
  transactionData: any;

  constructor(private todoService: TodoService) {}

  importData() {
    this.todoService.getAdminData().subscribe((data) => {
      this.admin = data;
      this.transactionData = this.admin.length;

      let counterCategory = this.admin.map(function (obj: any) {
        return obj.categories;
      });

      this.categoriesTotal = 0;
      counterCategory.forEach((element: object[]) => {
        this.categoriesTotal += element.length;
      });

      let counterCard = this.admin.map(function (obj: any) {
        return obj.cards;
      });
      this.cardsTotal = 0;
      counterCard.forEach((element: object[]) => {
        this.cardsTotal += element.length;
      });
      let sum1: any = [];
      counterCard.forEach((element: any) => {
        element.forEach((el: any) => {
          sum1.push(el.cardAmount);
        });
      });
      this.cardsTotalSum = sum1.reduce((a: number, b: number) => a + b, 0);

      let counterTransaction = this.admin.map(function (obj: any) {
        return obj.transaction;
      });

      this.transactionMade = 0;
      counterTransaction.forEach((element: object[]) => {
        this.transactionMade += element.length;
      });

      let tansactionsExpense: any = [];
      let lentgthofIncomes: any = [];

      counterTransaction.forEach((element: any) => {
        element.forEach((el: any) => {
          if (el.typeOfTransaction === 'expense') {
            tansactionsExpense.push(el.amount);
          }

          if (el.typeOfTransaction === 'income') {
            lentgthofIncomes.push(el.amount);
          }
        });
      });

      this.totalIncome = lentgthofIncomes.reduce(
        (a: number, b: number) => a + b,
        0
      );
      this.totalExpense = tansactionsExpense.reduce(
        (a: number, b: number) => a + b,
        0
      );
    });
  }

  ngOnInit(): void {
    this.importData();
    this.todoService.addNewTransaction$.subscribe(() => {
      this.importData();
    });
    this.todoService.addNewCard$.subscribe(() => {
      this.importData();
    });
    this.todoService.addNewCategory$.subscribe(() => {
      this.importData();
    });
  }
}

// element.forEach((el: any) => {
//   if(el.typeOfTransaction ==='expense') {
//     tansactionsExpense.push(el);
//   }

//   if(el.typeOfTransaction ==='income') {
//     tansactionsIncome.push(el);
//   }
// }
