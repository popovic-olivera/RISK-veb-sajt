import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  drawer: MatDrawer;

  @Input()
  isHandset: Observable<boolean>;

  constructor(public dialog: MatDialog, public auth: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  public displayLogin() {
    this.dialog.open(LoginComponent);
  }
}
