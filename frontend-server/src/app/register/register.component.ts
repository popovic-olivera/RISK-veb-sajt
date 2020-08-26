import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registrationForm: FormGroup;
  public defaultUser = {email: 'ai12345@alas.matf.bg.ac.rs', 
                        name: 'Petar',
                        surname: 'Petrović',
                        password: 'p@$$word123'}
  public hide = true;

  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, this.passwordValidator]),
      passwordRepeat: new FormControl(null, [Validators.required, this.passwordsEqual])
    })
  }

  get email() { return this.registrationForm.get('email'); }

  get name() { return this.registrationForm.get('name'); }

  get surname() { return this.registrationForm.get('surname'); }

  get password() { return this.registrationForm.get('password'); }

  get passwordRepeat() { return this.registrationForm.get('passwordRepeat'); }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    
    if ((control.value !== null && control.value.length <= 8) || !/[A-Z]/.test(control.value) || !/[0-9]/.test(control.value)) {
      return {'wrongValue': true};
    }

    return null;
  }

  passwordsEqual(control: AbstractControl): { [key: string]: boolean } | null {
    
    // TODO check passwords equality

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

  registerEnabled(): boolean {
    return this.registrationForm.valid;
  }

  register() {
    // TODO enable writing to database
  }
}
