import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss'],
})
export class RightSideComponent implements OnInit {
  user: any;
  constructor(private todoService: TodoService) {}

  healthCheck() {
    this.todoService.healthCheck().subscribe((data) => {
      this.user = data;
    });
  }
  ngOnInit(): void {
    this.healthCheck();
  }
}
