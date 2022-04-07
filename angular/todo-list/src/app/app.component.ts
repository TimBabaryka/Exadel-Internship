import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { TodoService } from './todo/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list';
  user: any;

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private router: Router
  ) {}
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  // healthCheck() {
  //   this.todoService.healthCheck().subscribe((data) => {
  //     (this.user = data), console.log(this.user.user.country);
  //   });
  // }
}
