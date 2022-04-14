import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  user: any;
  arrOfCards: any;

  constructor(private todoService: TodoService) {}

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCards = data.user.cards;
    });
  }

  ngOnInit(): void {
    this.getCardDatas();
  }
}
