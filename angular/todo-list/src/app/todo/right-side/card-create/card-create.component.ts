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
    description: new FormControl('', [Validators.required]),
  });

  constructor(private todoService: TodoService) {}

  onSubmitCreate() {
    const { cardName, cardAmount, currency, description } = this.CardForm.value;
    this.todoService
      .addCard(cardName, currency, cardAmount, description)
      .subscribe(() => {
        this.todoService.addNewCard$.next(null);
      });
  }
}
