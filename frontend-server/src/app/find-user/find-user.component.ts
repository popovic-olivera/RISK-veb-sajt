import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../profile/user-profile.model';
import { FilterUsersService } from '../services/filter-users.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.css']
})

export class FindUserComponent implements OnInit {
  public find = new FormControl(null, []);;
  public users: UserProfile[];

  constructor(private filterService: FilterUsersService,
              private router: Router) { }

  ngOnInit(): void { }

  public async filterUsers(name: string) {
    if (name !== "") {
      this.users = await this.filterService.getFilteredUsers(name);
    }
  }

  public onSelectionChanged(user: UserProfile) {
    this.find.setValue(user.firstName + " " + user.lastName);
    this.router.navigate(['/profil', user._id]);
    this.find.setValue(null);
  }
}
