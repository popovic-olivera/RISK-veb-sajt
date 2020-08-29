import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { passwordValidator, passwordsEqual } from './custom.validators';
import { processError } from './error.process.message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;

  public defaultUser = {email: 'primer@alas.matf.bg.ac.rs', 
                        firstName: 'Petar',
                        lastName: 'Petrović',
                        password: 'P@$$word123'};

  public hidePassword = true;
  public selectedImage: File;
                      
  constructor(public dialogRef: MatDialogRef<RegisterComponent>, private dialog: MatDialog, 
              private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    }, [passwordValidator, passwordsEqual]);
  }

  get email() { return this.registrationForm.get('email'); }
  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  emailErrorMessage(): string {
    return processError(this.email);
  }

  passwordErrorMessage(): string {
    return processError(this.password);
  }

  confirmErrorMessage(): string {
    return processError(this.confirmPassword);
  }

  registerEnabled(): boolean {
    return this.registrationForm.valid;
  }

  onFileChanged(event: Event) {
    this.selectedImage = (event.target as HTMLInputElement).files[0];
  }

  async onRegister() {
    const jsonData = this.registrationForm.getRawValue();
    
    // convert to form data in order to send media
    const formData = new FormData();

    Object.keys(jsonData).forEach(key => formData.append(key, jsonData[key]));
    formData.append('profilePicture', this.selectedImage);

    const loginSuccessful = await this.auth.register(formData);
    
    if (loginSuccessful) {
      this.dialogRef.close();
      this.dialog.open(InfoDialogComponent, {
        data: {successfulRegistration: true}
      });
    } 
    else {
      this.dialogRef.close();
      this.dialog.open(InfoDialogComponent, {
        data: {successfulRegistration: false}
      });
    }
  }
}
