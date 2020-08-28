import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator, passwordsEqual } from 'src/app/register/custom.validators';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-reset-dialog',
  templateUrl: './response-reset-dialog.component.html',
  styleUrls: ['./response-reset-dialog.component.css']
})

export class ResponseResetDialogComponent implements OnInit {
  public responseResetForm: FormGroup;
  public hidePassword = true;

  constructor(private auth: AuthenticationService, public dialogRef: MatDialogRef<ResponseResetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.responseResetForm = new FormGroup({
      password: new FormControl(null, [Validators.required, passwordValidator]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, passwordsEqual);
  }

  get password() { return this.responseResetForm.get('password'); }
  get confirmPassword() { return this.responseResetForm.get('confirmPassword'); }

  passwordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'Ovo je obavezno polje';
    } 
    else {
      return 'Ovo nije ispravan format lozinke';
    }
  }

  confirmErrorMessage(): string {
    if (this.confirmPassword.hasError('required')) {
      return 'Ovo je obavezno polje';
    } 
    else if (this.confirmPassword.hasError('notMatching')) {
      return 'Lozinke se ne poklapaju';
    }
    else {
      return 'Došlo je do greške';
    }
  }

  resetEnabled(): boolean {
    return this.responseResetForm.valid;
  }

  public async resetPassword() {
    const newPass = this.responseResetForm.get('password').value;
    const success = await this.auth.newPassword(newPass, this.data.resetToken);

    if (success) {
      alert('Uspesno promenjena lozinka');
    } else {
      alert('Promena nije uspela');
    }
  }
}
