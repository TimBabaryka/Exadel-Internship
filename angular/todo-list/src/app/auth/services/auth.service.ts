import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TodoService } from 'src/app/todo/services/todo.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private todo: TodoService) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:3000/api/login', {
        email,
        password,
      })
      .pipe(tap((res) => this.setSession(res)));
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  logout() {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('idToken');
    localStorage.removeItem('authuser');
    localStorage.removeItem('cardname');
    this.todo.setActiveId(null);
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('authuser', JSON.stringify(res.authuser));
    localStorage.setItem('idToken', res.apiKey);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
