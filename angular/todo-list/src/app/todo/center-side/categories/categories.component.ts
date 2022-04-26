import { Component, OnInit, Renderer2 } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private rendered: Renderer2,
    private route: Router
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
  // test(event: Event) {
  //   this.activeCategoryId === null;
  //   // this.rendered.removeClass(event.target, 'disable');
  //   this.rendered.addClass(event.target, 'alertGreen');
  // }

  getActiveCategory(id: string) {
    this.activeCategoryId = id;
    this.todoService.setActiveTrans(this.activeCategoryId);
    let temp = this.user.user.categories.filter((obj: any) => {
      return obj._id === id;
    });
    this.categoryInfoData = { ...temp[0] };
  }

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCategories = data.user.categories;
    });
  }

  getIdCatDelete(id: any) {
    this.todoService.deleteCategory(id);
    this.showSnackbarCssStyles(
      'Category was successfully deleted!',
      'Close',
      2000
    );
  }

  saveAndSendCat(id: string) {
    this.getActiveCategory(id);
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
