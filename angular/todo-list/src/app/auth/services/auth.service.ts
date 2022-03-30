import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http
      .get('http://localhost:3000/api/login', { params })
      .pipe(tap((res) => this.setSession(res)));
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem(' idToken', res.apiKey);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
