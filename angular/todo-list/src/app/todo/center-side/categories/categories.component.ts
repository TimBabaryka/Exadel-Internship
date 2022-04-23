import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  rowIWannaDisable: any;
  activateEdit: boolean = false;
  categoryInfoData!: any;
  user: any;
  arrOfCategories: any;
  activeId: any;
  activeCategoryId: any;

  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute
  ) {}

  getActiveCategory(id: string) {
    this.activeCategoryId = id;
    this.todoService.setActiveTrans(this.activeCategoryId);
    let temp = this.user.user.categories.filter((obj: any) => {
      return obj._id === id;
    });
    this.categoryInfoData = { ...temp[0] };
  }

  // toggleDisable() {
  //   this.buttonIcon = true;
  // }

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCategories = data.user.categories;
    });
  }

  getIdCatDelete(id: any) {
    this.todoService.deleteCategory(id);
  }

  saveAndSendCat(id: string) {
    this.getActiveCategory(id);
    console.log(this.activeCategoryId, this.categoryInfoData);
    this.todoService
      .sendCategoryEdit(this.activeCategoryId, this.categoryInfoData)
      .subscribe(() => {
        this.todoService.editCategory$.next(null);
      });
  }

  ngOnInit(): void {
    this.getCardDatas();
    this.activeId = this.todoService.getActiveId();
    this.todoService.addNewCategory$.subscribe(() => {
      this.getCardDatas();
    });
    this.todoService.editCategory$.subscribe(() => {
      this.getCardDatas();
    });
  }
}
