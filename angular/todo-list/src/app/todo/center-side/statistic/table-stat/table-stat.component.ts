import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl } from '@angular/forms';

// export interface PeriodicElement {
//   title: string;
//   date: number;
//   typeOfTransaction: string;
//   amount: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { date: 1, title: 'Hydrogen', typeOfTransaction: 'income', amount: 1 },
//   { date: 2, title: 'Helium', typeOfTransaction: 'income', amount: 2 },
//   { date: 3, title: 'Lithium', typeOfTransaction: 'expense', amount: 3 },
// ];
/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-table-stat',
  templateUrl: './table-stat.component.html',
  styleUrls: ['./table-stat.component.scss'],
})
export class TableStatComponent {
  range: any = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  @Input() data = [];

  dataforrender: any;

  displayedColumns: string[] = ['date', 'value'];
  dataSource = new MatTableDataSource(this.data);

  constructor() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    const map = this.data.reduce((a: any, b: any) => {
      const m = toDate(b.date).getMonth();
      a[m] = a[m] ? +a[m] + b.amount : +b.amount;
      return a;
    }, {});

    console.log(map);
    this.dataforrender = Object.entries(map).map(([key, value]) => ({
      value,
      date: month[+key],
    }));

    let tansactionsExpense: any = [];
    let transactionIncomes: any = [];
    let totalSum;
    let totalExpense;
    let margin;
    let marginPercent;

    this.data.forEach((element: any) => {
      if (element.typeOfTransaction === 'expense') {
        tansactionsExpense.push(element.amount);
      }
      if (element.typeOfTransaction === 'income') {
        transactionIncomes.push(element.amount);
      }
    });

    totalSum = transactionIncomes.reduce((a: number, b: number) => a + b, 0);
    totalExpense = tansactionsExpense.reduce(
      (a: number, b: number) => -a + -b,
      0
    );
    margin = totalSum + totalExpense;
    marginPercent = (margin * 100) / totalSum;

    console.log(totalSum, totalExpense, margin, marginPercent);
  }
}
