import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CardInfoComponent } from './card-info/card-info.component';
import { CardCreateComponent } from '../../right-side/card-create/card-create.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() activeId: any;
  user: any;
  arrOfCards: any;
  cardInfoData: any;
  activeCardId: any = this.todoService.getActiveId();
  noCards: boolean = false;

  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute,
    private dialogRef: MatDialog
  ) {}

  createCard() {
    this.dialogRef.open(CardCreateComponent);
  }
  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCards = data.user.cards;
      if (this.user.user.cards[0] === undefined) {
        this.noCards = true;
      }
    });
  }
  onCardClick(id: string) {
    this.activeCardId = id;
    this.todoService.setActiveId(id);
  }

  openCardWindow(id: any) {
    this.activeCardId = id;
    this.todoService.setActiveId(this.activeCardId);
    this.cardInfoData = this.user.user.cards.filter((obj: any) => {
      return obj._id === id;
    });
    this.dialogRef.open(CardInfoComponent, {
      data: this.cardInfoData,
    });
  }

  ngOnInit(): void {
    this.getCardDatas();
    this.todoService.addNewCard$.subscribe(() => {
      this.noCards = false;
      this.getCardDatas();
    });
    this.todoService.addNewTransaction$.subscribe(() => {
      this.getCardDatas();
    });
    this.todoService.deleteTransactions$.subscribe(() => {
      this.getCardDatas();
    });
    this.todoService.editCard$.subscribe(() => {
      this.getCardDatas();
    });
  }
}
