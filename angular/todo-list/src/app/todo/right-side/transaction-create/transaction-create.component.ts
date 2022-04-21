import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})
export class TransactionCreateComponent implements OnInit {
  activeId: any;
  TransactionForm: FormGroup = new FormGroup({
    payee: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    date: new FormControl('', [Validators.required]),
    activity: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    amount: new FormControl('', [Validators.required]),
    typeOfTransaction: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private todoService: TodoService) {}

  onSubmitCreateTransaction() {
    const {
      description,
      payee,
      date,
      activity,
      amount,
      typeOfTransaction,
      title,
    } = this.TransactionForm.value;
    const paidCard = (this.activeId = this.todoService.getActiveId());
    this.todoService
      .addTransaction(
        description,
        payee,
        date,
        activity,
        amount,
        paidCard,
        typeOfTransaction,
        title
      )
      .subscribe((data) => {
        this.todoService.addNewTransaction$.next(null);
        this.todoService.addNewCategory$.next(null);
      });
  }

  ngOnInit(): void {
    console.log((this.activeId = this.todoService.getActiveId())); //how does it know the active number?
  }
}
