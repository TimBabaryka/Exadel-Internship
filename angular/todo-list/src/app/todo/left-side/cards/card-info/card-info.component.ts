import { Component, OnInit, Inject } from '@angular/core';
import { TodoService } from 'src/app/todo/services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  activateEdit: boolean = false;
  activeCardId: any;
  dataOFActiveCard: any;
  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  deleteCard() {
    this.todoService.deleteCard(this.activeCardId);
    this.router.navigateByUrl('/todo');
    this.showSnackbarCssStyles('Card was successfully deleted!', 'Close', 2000);
  }

  saveAndSend() {
    this.todoService
      .sendCardEdit(this.activeCardId, this.dataOFActiveCard)
      .subscribe(() => {
        this.todoService.editCard$.next(null);
      });
  }

  ngOnInit(): void {
    this.activeCardId = this.todoService.getActiveId();
    this.dataOFActiveCard = { ...this.data[0] };
  }
}
