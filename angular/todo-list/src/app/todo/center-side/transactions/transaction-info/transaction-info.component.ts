import { Component, OnInit, Inject } from '@angular/core';
import { TodoService } from 'src/app/todo/services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss'],
})
export class TransactionInfoComponent implements OnInit {
  activateEdit: boolean = false;
  activeTransaction: any;
  dataOFActiveTrans: any;

  constructor(
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveAndSend() {
    this.todoService
      .sendTransactionEdit(this.activeTransaction, this.dataOFActiveTrans)
      .subscribe(() => {
        this.todoService.editTransaction$.next(null);
      });
  }

  deleteTrans() {
    this.todoService.deleteTransaction(this.activeTransaction);
  }

  ngOnInit(): void {
    this.activeTransaction = this.todoService.getActiveTrans();
    this.dataOFActiveTrans = { ...this.data[0] };
  }
}
