import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { CenterSideComponent } from '../center-side/center-side.component';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss'],
})
export class LeftSideComponent implements OnInit {
  user: any;
  arrOfCards: any;

  constructor(private todoService: TodoService) {}

  getCardDatas() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.arrOfCards = data.user.cards;
    });
  }

  render() {
    let res = this.getData();
    console.log(res.user);
  }

  getData() {
    let data: any = localStorage.getItem('authuser');
    return JSON.parse(data);
  }

  send() {
    console.log('Hello');
  }

  ngOnInit(): void {
    this.getData();
    this.getCardDatas();
    this.render();
  }
}
