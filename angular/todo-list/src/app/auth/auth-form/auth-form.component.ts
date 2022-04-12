import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  hide = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((data) => {
      console.log('Successful login');
      console.log(data);
      this.router.navigateByUrl('/todo');
    });
  }
}
