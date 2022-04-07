import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss'],
})
export class LeftSideComponent implements OnInit {
  user: any;

  constructor(private todoService: TodoService) {}
  healthCheck() {
    this.todoService.healthCheck().subscribe((data: any) => {
      this.user = data;
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
    // let data = document.querySelector('.card-name')?.innerHTML;
    // if (data !== null && data !== undefined) {
    //   localStorage.removeItem('cardname');
    //   localStorage.setItem('cardname', data);
    // }
    // let nameCard = localStorage.getItem('cardname');
    console.log('Hello');
  }

  ngOnInit(): void {
    this.getData();
    this.healthCheck();
    this.render();
  }
}
