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
  @Input() data: any;
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['date', 'title', 'typeOfTransaction', 'amount'];
  // dataSource = new MatTableDataSource(this.data);

  clicked() {
    console.log(this.data.filter);
  }

  constructor() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.data.filter = filterValue.trim().toLowerCase();
    console.log((this.data.filter = filterValue.trim().toLowerCase()));
  }
}
