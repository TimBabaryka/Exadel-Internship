import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}

  showSnackbarCssStyles(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-style'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  onSubmitCreate() {
    const { cardName, cardAmount, currency, description } = this.CardForm.value;
    this.todoService
      .addCard(cardName, currency, cardAmount, description)
      .subscribe(() => {
        this.showSnackbarCssStyles(
          'Cards was successfully created!',
          'Close',
          2000
        );
        this.todoService.addNewCard$.next(null);
      });
  }
}
