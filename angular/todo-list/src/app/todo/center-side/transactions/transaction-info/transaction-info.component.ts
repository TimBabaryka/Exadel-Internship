import { Component, OnInit, Inject } from '@angular/core';
import { TodoService } from 'src/app/todo/services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss'],
})
export class TransactionInfoComponent implements OnInit {
  activateEdit: boolean = false;
  activeTransaction: any;
  dataOFActiveTrans: any;

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
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
  saveAndSend() {
    this.todoService
      .sendTransactionEdit(this.activeTransaction, this.dataOFActiveTrans)
      .subscribe(() => {
        this.todoService.editTransaction$.next(null);
      });
  }

  deleteTrans() {
    this.todoService.deleteTransaction(this.activeTransaction);
    this.showSnackbarCssStyles(
      'Transaction was successfully deleted!',
      'Close',
      2000
    );
  }

  ngOnInit(): void {
    this.activeTransaction = this.todoService.getActiveTrans();
    this.dataOFActiveTrans = { ...this.data[0] };
  }
}
