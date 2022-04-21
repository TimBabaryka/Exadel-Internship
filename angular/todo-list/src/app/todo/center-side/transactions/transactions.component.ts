import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';

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
  constructor(
    private todoService: TodoService,
    private dialogRef: MatDialog,
    private route: ActivatedRoute
  ) {}

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

  getTransdData() {
    this.route.params.subscribe((params: Params) => {
      this.activeId = params;
      this.todoService.setActiveId(this.activeId.id);
    });
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.transactionsData = data.user.transaction;
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
  }
}
