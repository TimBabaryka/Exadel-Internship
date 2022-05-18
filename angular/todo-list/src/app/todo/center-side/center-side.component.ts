import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-center-side',
  templateUrl: './center-side.component.html',
  styleUrls: ['./center-side.component.scss'],
})
export class CenterSideComponent implements OnInit {
  user: any;
  transactionData: any;
  role: any;
  admPermission: boolean = false;
  hasId: boolean = false;
  activeId: any;

  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute,
    private route: Router,

    private _snackBar: MatSnackBar
  ) {}

  showSnackbarCssStyles(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-styleRed'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  checkId() {
    if (this.todoService.getActiveId() === null) {
      this.hasId = false;
      return;
    }
    this.hasId = true;
  }

  getAdminRole() {
    this.checkId();
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.role = data.user.roles;
      this.transactionData = data.user.transaction;

      if (this.role[0] === 'ADMIN') {
        this.admPermission = true;
      }
    });
  }

  ngOnInit(): void {
    this.getAdminRole();
    this.todoService.addNewCard$.subscribe(() => {
      this.getAdminRole();
    });
  }
}
