import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { map, switchMap } from 'rxjs/operators';
import { UserProfile } from '../user-profile.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  public profile: UserProfile;
  private activeSubscriptions: Subscription[];
  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private data: DataService
  ) {
    this.activeSubscriptions = [];
    this.findProfileById();
  }

  ngOnInit() {
    this.data.changeMessage('profile-view');
  }

  private findProfileById() {
    const getProfileSub = this.route.paramMap
      .pipe(
        map((params) => params.get('profileId')),
        switchMap((profileIdParam) =>
          this.profileService.getProfileById(profileIdParam)
        )
      )
      .subscribe((profile) => (this.profile = profile));
    this.activeSubscriptions.push(getProfileSub);
  }

  ngOnDestroy() {
    this.activeSubscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
