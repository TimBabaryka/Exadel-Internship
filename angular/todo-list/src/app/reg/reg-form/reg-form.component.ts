import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegFormService } from '../reg-form.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss'],
})
export class RegFormComponent {
  message: any;
  hide = true;
  RegForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    userName: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
  });
  constructor(private regServices: RegFormService, private router: Router) {}

  onSubmitReg() {
    const { email, password, userName, dateOfBirth, country } =
      this.RegForm.value;
    this.regServices
      .registration(email, password, userName, dateOfBirth, country)
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/login');
        },
        (err) => (this.message = err)
      );
  }
}
