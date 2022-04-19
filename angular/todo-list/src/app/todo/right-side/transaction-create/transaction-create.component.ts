import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})
export class TransactionCreateComponent implements OnInit {
  message: any;
  TransactionForm: FormGroup = new FormGroup({
    payee: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    activity: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    // paidCard: new FormControl('', [Validators.required]),
    typeOfTransaction: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private todoService: TodoService) {}

  onSubmitCreateTransaction() {
    const { description, payee, date, activity, amount, typeOfTransaction } =
      this.TransactionForm.value;
    const paidCard = (this.message = this.todoService.getActiveId());
    this.todoService
      .addTransaction(
        description,
        payee,
        date,
        activity,
        amount,
        paidCard,
        typeOfTransaction
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnInit(): void {}
}
