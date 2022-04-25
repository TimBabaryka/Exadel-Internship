import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { CardCreateComponent } from './card-create/card-create.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss'],
})
export class RightSideComponent implements OnInit {
  activeId: any;
  user: any;
  filter = { expense: true, income: true };
  constructor(
    private todoService: TodoService,
    private dialogRef: MatDialog
  ) // private router: Router
  {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  filterByExpense() {
    console.log(1);
  }

  filterByIncome() {
    console.log(2);
  }

  createTransaction() {
    this.dialogRef.open(TransactionCreateComponent);
  }

  createCard() {
    this.dialogRef.open(CardCreateComponent);
  }
  createCategory() {
    this.dialogRef.open(CategoryCreateComponent);
  }

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data) => {
      this.user = data;
    });
  }
  ngOnInit(): void {
    this.getCardDatas();
  }
}
