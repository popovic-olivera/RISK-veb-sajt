import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { RestorePasswordComponent } from '../restore-password/restore-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public auth: AuthenticationService, public dialog: MatDialog) {}

  public email = new FormControl(null, [Validators.required, Validators.email]);
  public password = new FormControl(null, [Validators.required]);

  // Used to display error message when the login response is unsuccessful
  public unsuccessfulLoginResponse = false;

  ngOnInit(): void {
  }

  async login() {
    const loginSuccessful = await this.auth.login(this.email.value, this.password.value);
    if (loginSuccessful) {
      this.dialogRef.close();
    } else {
      this.unsuccessfulLoginResponse = true;
    }
  }

  logout() {
    this.auth.logout();
  }

  emailErrorMessage(): string | null {
    if (this.email.hasError('required')) {
      return 'Ovo je obavezno polje';
    } else if (this.email.hasError('email')) {
      return 'Ovo nije ispravna imejl adresa';
    } else {
      return null;
    }
  }

  loginEnabled(): boolean {
    return this.email.valid && this.password.valid;
  }

  openRegisterDialog() {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent);
  }

  openRestorePasswordDialog() {
    this.dialogRef.close();
    this.dialog.open(RestorePasswordComponent);
  }
}
