import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})
export class TransactionCreateComponent {
  TransactionForm: FormGroup = new FormGroup({
    payee: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    activity: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    paidCard: new FormControl('', [Validators.required]),
  });
  constructor() {}

  onSubmitCreateTransaction() {
    // const { payee,date, activity,amount,paidCard} = this.CardForm.value;

    console.log(this.TransactionForm.value);
  }
}
