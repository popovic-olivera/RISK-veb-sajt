import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordsEqual, passwordValidator } from 'src/app/register/custom.validators';
import { processError } from 'src/app/register/error.process.message';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  public hidePassword = true;
  public changeForm: FormGroup;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      oldPassword: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    }, [passwordsEqual, passwordValidator]);
  }

  get oldPassword() { return this.changeForm.get('oldPassword'); }
  get password() { return this.changeForm.get('password'); }
  get confirmPassword() { return this.changeForm.get('confirmPassword'); }

  passwordErrorMessage(): string {
    return processError(this.password);
  }

  confirmErrorMessage(): string {
    return processError(this.confirmPassword);
  }

  changeEnabled(): boolean {
    return this.changeForm.valid;
  }

  public async changePassword() {
    const newPass = this.changeForm.get('password').value;
    const oldPass = this.changeForm.get('oldPassword').value;
    const success = await this.auth.changePassword(newPass, oldPass);

    // if (success) {
    //   this.dialog.open(MessageDialogComponent, {
    //     data: {changeSuccessful: true}
    //   });
    // } else {
    //   this.dialog.open(MessageDialogComponent, {
    //     data: {changeFailed: true}
    //   });
    // }
  }

}
