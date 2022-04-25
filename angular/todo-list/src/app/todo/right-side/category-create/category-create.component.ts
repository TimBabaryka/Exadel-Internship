import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  activeId: any;
  CategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    categoryType: new FormControl('', [Validators.required]),
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
    const { categoryName, categoryType } = this.CategoryForm.value;
    const cardId = (this.activeId = this.todoService.getActiveId());
    this.todoService
      .addCategory(categoryName, categoryType, cardId)
      .subscribe(() => {
        this.todoService.addNewCategory$.next(null);
      });
    this.showSnackbarCssStyles(
      'Category was successfully created!',
      'Close',
      2000
    );
  }
  ngOnInit(): void {}
}
