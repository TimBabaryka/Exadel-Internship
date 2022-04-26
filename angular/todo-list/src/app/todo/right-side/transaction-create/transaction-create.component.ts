import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})
export class TransactionCreateComponent implements OnInit {
  category: any;
  onlyCategories: any;
  arrOfCategories: any;
  user: any;
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
  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}
  chipsControl = new FormControl('');
  chipsValue$ = this.chipsControl.valueChanges;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.onlyCategories.push(value);
    }
    event.chipInput!.clear();
  }

  showSnackbarCssStyles(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-style'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  remove(fruit: any): void {
    const index = this.onlyCategories.indexOf(fruit);

    if (index >= 0) {
      this.onlyCategories.splice(index, 1);
    }
  }

  getCategories() {
    let id = this.todoService.getActiveId();
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCategories = data.user.categories;

      let filteredCategory = this.arrOfCategories.filter(function (el: any) {
        return el.cardId === id;
      });
      this.onlyCategories = filteredCategory.map(function (a: any) {
        return a.categoryName;
      });
    });
  }

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
        activity.trim(),
        amount,
        paidCard,
        typeOfTransaction,
        title
      )
      .subscribe(() => {
        this.todoService.addNewTransaction$.next(null);
        this.todoService.addNewCategory$.next(null);
      });
    this.showSnackbarCssStyles(
      'Transaction was successfully created!',
      'Close',
      2000
    );
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
