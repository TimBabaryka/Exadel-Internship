import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  admin: any;
  transactionData: any;

  constructor(private todoService: TodoService) {}

  importData() {
    this.todoService.getAdminData().subscribe((data) => {
      this.admin = data;
      this.transactionData = this.admin.length;
    });
  }

  ngOnInit(): void {
    this.importData();
  }
}
