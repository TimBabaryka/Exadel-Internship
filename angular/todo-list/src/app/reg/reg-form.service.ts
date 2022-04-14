import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegFormService {
  constructor(private http: HttpClient) {}

  registration(
    email: string,
    password: string,
    userName: string,
    dateOfBirth: string,
    country: string
  ) {
    return this.http.post('http://localhost:3000/api/registration', {
      email,
      password,
      userName,
      dateOfBirth,
      country,
    });
  }
}
