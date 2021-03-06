import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  activeTransaction: any;
  transactionInfoData: any;
  activeId: any;
  user: any;
  transactionsData: any;
  filter = { expense: true, income: true };

  filteredTransactions: any;
  constructor(
    private todoService: TodoService,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  showSnackbarCssStyles(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-style'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  showSnackbarCssStylesRed(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-styleRed'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  filterChange() {
    this.filteredTransactions = this.transactionsData.filter(
      (x: any) =>
        (x.typeOfTransaction === 'expense' && this.filter.expense) ||
        (x.typeOfTransaction === 'income' && this.filter.income)
    );
  }

  openTransInfo(id: string) {
    this.activeTransaction = id;
    this.todoService.setActiveTrans(this.activeTransaction);
    this.transactionInfoData = this.user.user.transaction.filter((obj: any) => {
      return obj._id === id;
    });
    this.dialogRef.open(TransactionInfoComponent, {
      data: this.transactionInfoData,
    });
  }

  sortTrans() {
    if (this.filteredTransactions[0] === undefined) {
      this.showSnackbarCssStylesRed('No transactions to sort!', 'Close', 2000);
      return;
    }
    const reversed = this.filteredTransactions.reverse();
    this.showSnackbarCssStyles('Transactions sorted!', 'Close', 2000);
  }

  getTransdData() {
    this.route.params.subscribe((params: Params) => {
      this.activeId = params;
      this.todoService.setActiveId(this.activeId.id);
    });
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.transactionsData = data.user.transaction.filter(
        (x: any) => x.paidCard === this.activeId.id
      );
      this.filteredTransactions = this.transactionsData;
      this.filter.expense = true;
      this.filter.income = true;
    });
  }

  ngOnInit(): void {
    this.getTransdData();
    this.todoService.addNewTransaction$.subscribe(() => {
      this.getTransdData();
    });
    this.todoService.deleteTransactions$.subscribe(() => {
      this.getTransdData();
    });
    this.todoService.editTransaction$.subscribe(() => {
      this.getTransdData();
    });
    this.route.params.subscribe((params) => {
      this.activeId = params['requestId'];
      this.getTransdData();
    });
  }
}
