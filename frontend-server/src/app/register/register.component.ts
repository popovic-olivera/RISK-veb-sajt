import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;

  public defaultUser = {email: 'ai12345@alas.matf.bg.ac.rs', 
                        firstName: 'Petar',
                        lastName: 'Petrović',
                        password: 'p@$$word123'};

  public hide = true;
                      
  constructor(public dialogRef: MatDialogRef<RegisterComponent>, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, this.passwordValidator]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, this.passwordsEqual);
  }

  get email() { return this.registrationForm.get('email'); }

  get firstName() { return this.registrationForm.get('firstName'); }

  get lastName() { return this.registrationForm.get('lastName'); }

  get password() { return this.registrationForm.get('password'); }

  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    
    if ((control.value && control.value.length < 8) || !/[A-Z]/.test(control.value) || !/[0-9]/.test(control.value)) {
      return {'wrongValue': true};
    }

    return null;
  }

  passwordsEqual(form: FormGroup): { [key: string]: boolean } | null {
    
    const pass = form.get('password').value;
    const confirmPass = form.get('confirmPassword').value

    if (pass && confirmPass) {
      if (pass !== confirmPass) {
        form.get('confirmPassword').setErrors({
          notMatching: true
        })
      }
    }

    return null;   
  }

  emailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Ovo je obavezno polje';
    } else if (this.email.hasError('email')) {
      return 'Ovo nije ispravna imejl adresa';
    } else {
      return 'Nešto nije u redu';
    }
  }

  passwordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'Ovo je obavezno polje';
    } else {
      return 'Ovo nije ispravan format lozinke';
    }
  }

  confirmErrorMessage(): string {
    if (this.confirmPassword.hasError('required')) {
      return 'Ovo je obavezno polje';
    } else {
      return 'Lozinke se ne poklapaju';
    }
  }

  registerEnabled(): boolean {
    return this.registrationForm.valid;
  }

  async onSubmit() {
    const newUser = this.registrationForm.value;
    const loginSuccessful = await this.auth.register(newUser);
    
    if (loginSuccessful) {
      this.dialogRef.close();
    } else {
      alert('Registracija nije uspela. Postoji korisnik sa datom imejl adresom u bazi!');
    }
  }
}
