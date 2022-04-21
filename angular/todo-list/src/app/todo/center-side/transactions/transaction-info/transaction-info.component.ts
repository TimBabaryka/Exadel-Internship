import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo/services/todo.service';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss'],
})
export class TransactionInfoComponent implements OnInit {
  activeTransaction: any;

  constructor(private todoService: TodoService) {}

  deleteTrans() {
    this.todoService.deleteTransaction(this.activeTransaction);
  }

  ngOnInit(): void {
    this.activeTransaction = this.todoService.getActiveTrans();
  }
}
