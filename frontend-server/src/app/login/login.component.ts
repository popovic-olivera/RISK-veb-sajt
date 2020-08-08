import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

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
    this.auth.login(this.email, this.password);
  }
}
