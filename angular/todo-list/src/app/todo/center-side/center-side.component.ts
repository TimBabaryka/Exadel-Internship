import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-center-side',
  templateUrl: './center-side.component.html',
  styleUrls: ['./center-side.component.scss'],
})
export class CenterSideComponent implements OnInit {
  user: any;
  role: any;
  admPermission: boolean = false;

  constructor(private todoService: TodoService) {}

  doSomething() {
    console.log('I am doing something!');
  }

  getAdminRole() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.role = data.user.roles;

      if (this.role[0] === 'ADMIN') {
        this.admPermission = true;
      }
    });
  }

  ngOnInit(): void {
    this.getAdminRole();
  }
}
