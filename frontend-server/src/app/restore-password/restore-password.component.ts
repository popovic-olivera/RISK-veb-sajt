import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { processError } from '../register/error.process.message';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})

export class RestorePasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public hidePassword = true;

  constructor(private auth: AuthenticationService, private dialog: MatDialog, 
              public dialogRef: MatDialogRef<RestorePasswordComponent>) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  get email() { return this.resetPasswordForm.get('email'); }

  emailErrorMessage(): string {
    return processError(this.email);
  }

  resetEnabled(): boolean {
    return this.resetPasswordForm.valid;
  }

  async onSubmit() {
    const userEmail = this.resetPasswordForm.value.email;
    const success = await this.auth.resetPassword(userEmail);

    if (success) {
      this.dialog.open(MessageDialogComponent, {
        data: {resetSuccessful: true}
      });
      this.dialogRef.close();
    }
    else {
      this.dialog.open(MessageDialogComponent, {
        data: {resetFailed: true}
      });
    }
  }
}
