import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator, passwordsEqual } from 'src/app/register/custom.validators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { processError } from 'src/app/register/error.process.message';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';

@Component({
  selector: 'app-response-reset-dialog',
  templateUrl: './response-reset-dialog.component.html',
  styleUrls: ['./response-reset-dialog.component.css']
})

export class ResponseResetDialogComponent implements OnInit {
  public responseResetForm: FormGroup;
  public hidePassword = true;

  constructor(private auth: AuthenticationService, private dialog: MatDialog, 
              public dialogRef: MatDialogRef<ResponseResetDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.responseResetForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    }, [passwordsEqual, passwordValidator]);
  }

  get password() { return this.responseResetForm.get('password'); }
  get confirmPassword() { return this.responseResetForm.get('confirmPassword'); }

  passwordErrorMessage(): string {
    return processError(this.password);
  }

  confirmErrorMessage(): string {
    return processError(this.confirmPassword);
  }

  resetEnabled(): boolean {
    return this.responseResetForm.valid;
  }

  public async resetPassword() {
    const newPass = this.responseResetForm.get('password').value;
    const success = await this.auth.newPassword(newPass, this.data.resetToken);

    if (success) {
      this.dialog.open(MessageDialogComponent, {
        data: {changeSuccessful: true}
      });
    } else {
      this.dialog.open(MessageDialogComponent, {
        data: {changeFailed: true}
      });
    }
    
    this.dialogRef.close();
  }
}
