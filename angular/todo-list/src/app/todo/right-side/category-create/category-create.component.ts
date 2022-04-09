import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent {
  CategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    incomeExpense: new FormControl('', [Validators.required]),
  });

  constructor() {}

  onSubmitCreate() {
    // const { cardAmount, currency, cardName } = this.CardForm.value;

    console.log(this.CategoryForm.value);
  }
}
