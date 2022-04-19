import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  user: any;
  arrOfCategories: any;
  activeId: any;
  constructor(private todoService: TodoService) {}

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCategories = data.user.categories;
    });
  }

  ngOnInit(): void {
    this.getCardDatas();
    this.activeId = this.todoService.getActiveId();
    console.log(this.activeId);
  }
}
