import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  activeId: any;
  CategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    categoryType: new FormControl('', [Validators.required]),
  });

  constructor(private todoService: TodoService) {}

  onSubmitCreate() {
    const { categoryName, categoryType } = this.CategoryForm.value;
    const cardId = (this.activeId = this.todoService.getActiveId());
    this.todoService
      .addCategory(categoryName, categoryType, cardId)
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnInit(): void {
    console.log((this.activeId = this.todoService.getActiveId())); //how does it know the active number?
  }
}
