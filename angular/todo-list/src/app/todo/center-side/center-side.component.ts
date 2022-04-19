import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-center-side',
  templateUrl: './center-side.component.html',
  styleUrls: ['./center-side.component.scss'],
})
export class CenterSideComponent implements OnInit {
  user: any;
  transactionData: any;
  role: any;
  admPermission: boolean = false;

  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute
  ) {}

  doSomething() {
    console.log('I am doing something!');
    const allParams = this.router.snapshot.params;
    console.log(allParams);
  }

  getAdminRole() {
    this.todoService.getCardDatas().subscribe((data: any) => {
      this.user = data;
      this.role = data.user.roles;
      this.transactionData = data.user.transaction;

      if (this.role[0] === 'ADMIN') {
        this.admPermission = true;
      }
    });
  }

  ngOnInit(): void {
    this.getAdminRole();
  }
}
