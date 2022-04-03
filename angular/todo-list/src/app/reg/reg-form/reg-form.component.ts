import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss'],
})
export class RegFormComponent {
  RegForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
  });
  constructor(private authServices: AuthService, private router: Router) {}

  onSubmitReg() {
    const { email, password, userName, dateOfBirth, country } =
      this.RegForm.value;
    this.authServices
      .registration(email, password, userName, dateOfBirth, country)
      .subscribe((data) => {
        console.log('Successful registration');
        console.log(data);
        this.router.navigateByUrl('/login');
      });
  }
}
