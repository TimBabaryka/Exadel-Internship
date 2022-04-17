import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss'],
})
export class LeftSideComponent implements OnInit {
  user: any;
  arrOfCards: any;

  constructor(
    private todoService: TodoService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
