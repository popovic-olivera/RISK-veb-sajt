import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

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
    const userEmail = this.resetPasswordForm.value.email;
    const success = await this.auth.resetPassword(userEmail);

    if (success) {
      alert('Poslat Vam je mejl za promenu lozinke');
    }
    else {
      alert('Promena nije uspela...Proverite da li ste dobro uneli imejl adresu!');
    }
  }
}
