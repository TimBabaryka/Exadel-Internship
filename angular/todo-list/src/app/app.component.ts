import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list';

  constructor(private authService: AuthService, private router: Router) {}
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  healthCheck() {
    this.authService.healthCheck().subscribe((data) => console.log(data));
  }
}
