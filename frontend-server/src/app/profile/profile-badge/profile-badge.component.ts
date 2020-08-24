import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-badge',
  templateUrl: './profile-badge.component.html',
  styleUrls: ['./profile-badge.component.css']
})
export class ProfileBadgeComponent implements OnInit {

  constructor(public auth: AuthenticationService, public prof: ProfileService) { }

  ngOnInit(): void {
  }

}