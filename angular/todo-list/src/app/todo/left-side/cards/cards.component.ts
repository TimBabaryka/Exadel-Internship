import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() activeId: any;
  user: any;
  arrOfCards: any;

  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute
  ) {}

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCards = data.user.cards;
    });
  }

  ngOnInit(): void {
    this.getCardDatas();
    this.todoService.addNewCard$.subscribe(() => {
      this.getCardDatas();
    });
    this.todoService.addNewTransaction$.subscribe(() => {
      this.getCardDatas();
    });
  }
}
