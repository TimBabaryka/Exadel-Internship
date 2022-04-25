import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  user: any;
  activeId!: string;
  arrOfTransactions: any;

  constructor(private todoService: TodoService) {}

  importData() {
    this.activeId = this.todoService.getActiveId();
    this.todoService.getCardDatas().subscribe((data) => {
      this.user = data;
      this.arrOfTransactions = this.user.user.transaction.filter((obj: any) => {
        return obj.paidCard === this.activeId;
      });
    });
  }

  ngOnInit(): void {
    this.importData();
    this.todoService.addNewTransaction$.subscribe(() => {
      this.importData();
    });
  }
}
