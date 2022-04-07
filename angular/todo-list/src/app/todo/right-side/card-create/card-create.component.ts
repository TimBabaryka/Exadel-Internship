import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss'],
})
export class CardCreateComponent {
  CardForm: FormGroup = new FormGroup({
    cardAmount: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    cardName: new FormControl('', [Validators.required]),
  });

  constructor() {}

  onSubmitCreate() {
    // const { cardAmount, currency, cardName } = this.CardForm.value;

    console.log(this.CardForm.value);
  }
}
