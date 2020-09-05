import { Injectable } from '@angular/core';
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
  private readonly profileUrl = 'http://localhost:4200/api/users/';

  constructor(router: Router, private http: HttpClient) {
      super(router);
  }

  public getProfileById(id: string): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(this.profileUrl + id)
      .pipe(catchError(super.handleError()));
  }
}
