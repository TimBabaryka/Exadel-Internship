import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../left-side/cards.service';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  activeId: any;
  user: any;
  transactionsData: any;
  constructor(
    private todoService: TodoService,
    private data: CardsService,
    private route: ActivatedRoute
  ) {}

  getTransdData() {
    this.route.params.subscribe((params: Params) => {
      this.activeId = params;
    });
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.transactionsData = data.user.transaction;
    });
  }

  ngOnInit(): void {
    this.getTransdData();
  }
}
