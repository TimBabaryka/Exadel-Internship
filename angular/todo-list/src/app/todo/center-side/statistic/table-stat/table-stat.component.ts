import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from 'src/app/todo/services/todo.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-table-stat',
  templateUrl: './table-stat.component.html',
  styleUrls: ['./table-stat.component.scss'],
})
export class TableStatComponent implements OnInit {
  activeId!: string;
  user: any;
  arrOfTransactions: any = [];
  range: any = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  @Input() data = [];

  toggleButton: boolean = false;

  income!: number;
  expense!: number;
  margin!: number;
  marginPercent!: number;

  dataforrender: any;

  displayedColumns: string[] = ['date', 'value'];
  dataSource = new MatTableDataSource(this.data);

  constructor(private todoService: TodoService) {}

  importData() {
    this.activeId = this.todoService.getActiveId();
    this.todoService.getCardDatas().subscribe((data) => {
      this.user = data;
      this.arrOfTransactions = this.user.user.transaction.filter((obj: any) => {
        return obj.paidCard === this.activeId;
      });
      this.clicked();
    });
  }

  clicked() {
    const toDate = (str: string) =>
      new Date(str.replace(/^(\d+)\/(\d+)\/(\d+)$/, '$2/$1/$3'));
    const month = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    let mutatedTransactionsExpense: any = [];

    this.arrOfTransactions.forEach((element: any) => {
      const newEl = { ...element };
      if (element.typeOfTransaction === 'expense') {
        newEl.amount = element.amount * -1;
      }
      mutatedTransactionsExpense.push(newEl);
    });

    const map = mutatedTransactionsExpense.reduce((a: any, b: any) => {
      const m = toDate(b.date).getMonth();
      a[m] = a[m] ? +a[m] + b.amount : +b.amount;
      return a;
    }, {});

    this.dataforrender = Object.entries(map).map(([key, value]) => ({
      value,
      date: month[+key],
    }));

    let tansactionsExpense: any = [];
    let transactionIncomes: any = [];

    this.arrOfTransactions.forEach((element: any) => {
      if (element.typeOfTransaction === 'expense') {
        tansactionsExpense.push(element.amount);
      }
      if (element.typeOfTransaction === 'income') {
        transactionIncomes.push(element.amount);
      }
    });

    this.income = transactionIncomes.reduce((a: number, b: number) => a + b, 0);
    this.expense = tansactionsExpense.reduce(
      (a: number, b: number) => a + b,
      0
    );

    this.margin = this.income + -this.expense;

    this.marginPercent = Math.round((this.margin * 100) / this.income);
  }

  ngOnInit(): void {
    this.importData();
    this.todoService.addNewTransaction$.subscribe(() => {
      this.importData();
    });
  }
}
