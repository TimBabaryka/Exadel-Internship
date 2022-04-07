import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { CardCreateComponent } from './card-create/card-create.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss'],
})
export class RightSideComponent implements OnInit {
  user: any;
  constructor(private todoService: TodoService, private dialogRef: MatDialog) {}

  filterByExpense() {
    console.log('Filter income');
  }

  filterByIncome() {
    console.log('Filter expense');
  }

  createTransaction() {
    this.dialogRef.open(TransactionCreateComponent);
  }

  createCard() {
    this.dialogRef.open(CardCreateComponent);
  }

  healthCheck() {
    this.todoService.healthCheck().subscribe((data) => {
      this.user = data;
    });
  }
  ngOnInit(): void {
    this.healthCheck();
  }
}
