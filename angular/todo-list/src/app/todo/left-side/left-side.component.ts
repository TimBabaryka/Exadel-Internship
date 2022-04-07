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
    this.todoService.healthCheck().subscribe((data) => {
      this.user = data;
    });
  }

  getData() {
    let data: any = localStorage.getItem('authuser');
    return JSON.parse(data);
  }

  render() {
    let res = this.getData();
    console.log(res.user);
  }

  ngOnInit(): void {
    this.getData();
    this.healthCheck();
    this.render();
  }
}
