import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { passwordValidator, passwordsEqual } from '../register/custom.validators';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})

export class RestorePasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public hidePassword = true;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  get email() { return this.resetPasswordForm.get('email'); }

  emailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Ovo je obavezno polje';
    } 
    else if (this.email.hasError('email')) {
      return 'Ovo nije ispravna imejl adresa';
    } 
    else {
      return 'Došlo je do greške';
    }
  }

  resetEnabled(): boolean {
    return this.resetPasswordForm.valid;
  }

  async onSubmit() {
    // TODO restore password in database
  }
}
