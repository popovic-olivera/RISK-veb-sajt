import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService) {}

  public email: string;
  public password: string;

  ngOnInit(): void {
  }

  login() {
    const credentials: TokenPayload = {
      email: this.email,
      password: this.password
    };
    this.auth.login(credentials).subscribe(() => {
      // TODO do something useful
      console.log(`Logged in: ${this.auth.isLoggedIn()}`);
    });
  }
}
