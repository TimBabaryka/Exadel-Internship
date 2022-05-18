import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegFormService } from '../reg-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private regServices: RegFormService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  showSnackbarCssStyles(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-style'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  showSnackbarCssStylesRed(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      panelClass: ['custom-styleRed'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  onSubmitReg() {
    const { email, password, userName, dateOfBirth, country } =
      this.RegForm.value;
    this.regServices
      .registration(email, password, userName, dateOfBirth, country)
      .subscribe(
        () => {
          this.router.navigateByUrl('/login');
          this.showSnackbarCssStyles(
            ' You were successfully registered!',
            'Close',
            2000
          );
        },
        (err) => (
          (this.message = err),
          this.showSnackbarCssStylesRed(
            'Failed to register. Try another email!',
            'Close',
            5000
          )
        )
      );
  }
}
