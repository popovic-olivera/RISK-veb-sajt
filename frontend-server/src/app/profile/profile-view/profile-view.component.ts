import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ProfileService } from '../profile.service';
import { UserProfile } from '../user-profile.model';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShowUserListComponent } from './show-user-list/show-user-list.component';
import { BlogService } from 'src/app/blog/blog.service';
import { BlogPost } from 'src/app/blog/blog-post.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css', '../../app.component.css']
})

export class ProfileViewComponent implements OnInit, OnDestroy {
  private readonly btnTextMap = {
    following: "Otprati",
    follow: "Zaprati"
  };

  public profile: UserProfile;
  public blogPosts: BlogPost[] = [];
  public btnText: string;
  private subscription: Subscription;

  constructor(private router: Router, private profileService: ProfileService,
              private data: DataService, private auth: AuthenticationService,
              private dialog: MatDialog, private blogService: BlogService) {

    this.findProfileById();

    this.initBtnText();
                
    this.subscription = this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        this.onRouteChange();
      }
    });

    this.initBlogPosts();
  }

  ngOnInit() {
    this.data.changeMessage('profile-view');
  }

  private initBtnText() {
    const currentUser = this.auth.getUserProfile();
    const profileId = this.getIdFromRoute();
    
    if (currentUser.following.includes(profileId)) {
      this.btnText = this.btnTextMap.following;
    } else {
      this.btnText = this.btnTextMap.follow;
    }
  }

  private getIdFromRoute() {
    return this.router.url.split("/").pop();
  }

  private async initBlogPosts() {
    const profileId = this.getIdFromRoute();

    this.blogPosts = await this.blogService.getBlogPostsByAuthorId(profileId);
    this.blogPosts = this.blogPosts.reverse();
  }

  private async findProfileById() {
    const profileId = this.getIdFromRoute();

    this.profile = await this.profileService.getProfileById(profileId).toPromise();
  }

  private onRouteChange() {
    this.findProfileById();
    this.initBlogPosts();
    this.initBtnText();
  }

  public isFollowEnabled() {
    const currentUser = this.auth.getUserProfile();

    return currentUser && (currentUser._id !== this.profile._id);
  }

  public onClick() {
    const currentUser = this.auth.getUserProfile();
    
    if (currentUser.following.includes(this.profile._id)) {
      this.btnText = this.btnTextMap.follow;

      this.auth.unfollowUser(this.profile._id);
    } else {
      this.btnText = this.btnTextMap.following;

      this.auth.followUser(this.profile._id);
    }

    this.findProfileById();
    this.auth.refreshProfile();
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
