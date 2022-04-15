import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss'],
})
export class CardCreateComponent {
  CardForm: FormGroup = new FormGroup({
    cardName: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    cardAmount: new FormControl('', [Validators.required]),
  });

  constructor(private todoService: TodoService) {}

  onSubmitCreate() {
    const { cardName, cardAmount, currency } = this.CardForm.value;
    console.log(this.CardForm.value);
    this.todoService
      .addCard(cardName, currency, cardAmount)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
