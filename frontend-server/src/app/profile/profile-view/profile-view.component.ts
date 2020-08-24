import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { map, switchMap } from 'rxjs/operators';
import { UserProfile } from '../user-profile.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnDestroy {
  private profile: UserProfile;
  private activeSubscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.activeSubscriptions = [];
    this.findProfileById();
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
