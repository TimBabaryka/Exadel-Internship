import { Component, OnInit, Inject } from '@angular/core';
import { TodoService } from 'src/app/todo/services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  activeCardId: any;
  dataOFActiveCard: any;
  constructor(
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteCard() {
    this.todoService.deleteCard(this.activeCardId);
  }

  ngOnInit(): void {
    this.activeCardId = this.todoService.getActiveId();
    this.dataOFActiveCard = this.data[0];
  }
}
