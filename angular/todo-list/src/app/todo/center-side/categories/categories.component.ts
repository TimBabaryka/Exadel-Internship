import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  user: any;
  arrOfCategories: any;
  activeId: any;
  activeCategoryId: any;
  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute
  ) {}

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCategories = data.user.categories;
    });
  }

  getIdCatDelete(id: any) {
    this.todoService.deleteCategory(id);
  }

  ngOnInit(): void {
    this.getCardDatas();
    this.activeId = this.todoService.getActiveId();
    this.todoService.addNewCategory$.subscribe(() => {
      this.getCardDatas();
    });
  }
}
