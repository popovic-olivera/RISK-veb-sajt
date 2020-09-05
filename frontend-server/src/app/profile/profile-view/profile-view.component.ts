import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ProfileService } from '../profile.service';
import { UserProfile } from '../user-profile.model';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShowUserListComponent } from './show-user-list/show-user-list.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css', '../../app.component.css']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  public profile: UserProfile;
  public btnText = "Zaprati";
  private subscription: Subscription;

  constructor(private router: Router, private profileService: ProfileService,
              private data: DataService, private auth: AuthenticationService,
              private dialog: MatDialog) {

    this.findProfileById();

    this.subscription = this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        this.onRouteChange();
      }
    });
  }

  ngOnInit() {
    this.data.changeMessage('profile-view');
  }

  private async findProfileById() {
    const profileId = this.router.url.split("/").pop();

    this.profile = await this.profileService.getProfileById(profileId).toPromise();
  }

  private onRouteChange() {
    this.findProfileById();
  }

  public isFollowEnabled() {
    const currentUser = this.auth.getUserProfile();

    return currentUser && (currentUser._id !== this.profile._id);
  }

  public alreadyFollowing() {
    const currentUser = this.auth.getUserProfile();
    
    if (currentUser.following.includes(this.profile._id)) {
      this.btnText = "Praćenje";

      return true;
    }

    this.btnText = "Zaprati";
    return false;
  }

  public onFollow() {
    this.auth.updateFollowers(this.profile._id);

    this.findProfileById();
    this.auth.updateProfile();
  }

  public openFollowing() {
    if (this.profile.following.length > 0) {
      this.dialog.open(ShowUserListComponent, {
        data: {users: this.profile.following}
      });
    }
  }

  public openFollowers() {
    if (this.profile.followers.length > 0) {
      this.dialog.open(ShowUserListComponent, {
        data: {users: this.profile.followers}
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
