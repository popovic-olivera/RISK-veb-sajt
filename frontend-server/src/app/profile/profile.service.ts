import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends HttpErrorHandler {
  private profiles: Observable<UserProfile[]>;
  private readonly profileUrl = 'http://localhost:4200/api/user/';

  constructor(
    private auth: AuthenticationService,
    router: Router,
    private http: HttpClient) {
      super(router);
      this.refreshProfiles();
    }

  private refreshProfiles(): Observable<UserProfile[]> {
    this.profiles = this.http
      .get<UserProfile[]>(this.profileUrl)
      .pipe(catchError(super.handleError()));
    return this.profiles;
  }

  public getProfiles(): Observable<UserProfile[]> {
    return this.profiles;
  }

  public getProfileById(id: string): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(this.profileUrl + id)
      .pipe(catchError(super.handleError()));
  }
}
