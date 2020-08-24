import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-profile-badge',
  templateUrl: './profile-badge.component.html',
  styleUrls: ['./profile-badge.component.css']
})
export class ProfileBadgeComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

}
