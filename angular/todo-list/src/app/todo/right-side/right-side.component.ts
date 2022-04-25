import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { CardCreateComponent } from './card-create/card-create.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  filterByExpense() {
    console.log(1);
  }

  filterByIncome() {
    console.log(2);
  }

  showSnackbarCssStyles(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-styleRed'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  createTransaction() {
    if (this.todoService.getActiveId() === null) {
      this.showSnackbarCssStyles('No chosen card. Select Card!', 'Close', 2000);

      return;
    }
    this.dialogRef.open(TransactionCreateComponent, {
      autoFocus: false,
      maxHeight: '90vh',
    });
  }

  createCard() {
    this.dialogRef.open(CardCreateComponent);
  }
  createCategory() {
    if (this.todoService.getActiveId() === null) {
      this.showSnackbarCssStyles('No chosen card. Select Card!', 'Close', 2000);
      return;
    }
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
