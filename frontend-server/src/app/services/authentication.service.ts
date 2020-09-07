import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserProfile } from '../profile/user-profile.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly usersUrl = '/api/users/';

  private userProfile: UserProfile;
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string) {
    localStorage.setItem('auth-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  private saveUserProfile(profile: UserProfile) {
    localStorage.setItem('user-profile', JSON.stringify(profile));
    this.userProfile = profile;
  }

  public getUserProfile(): UserProfile {
    if (!this.userProfile) {
      this.userProfile = JSON.parse(localStorage.getItem('user-profile'));
    }
    return this.userProfile;
  }

  public isUserAdmin(): boolean {
    return this.userProfile.administrator;
  }

  public async logout() {
    this.token = undefined;
    this.userProfile = undefined;
    window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('user-profile');

    await this.router.navigateByUrl('/');
  }

  public updateProfile() {
    this.fetchProfile(this.userProfile._id);
  }

  private fetchProfile(id: string): void {
    this.http.get<UserProfile>(
      `api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      }
    ).subscribe((profile) => {
      this.saveUserProfile(profile);
    });
  }

  private static extractUserIdFromJwtToken(token: string): string {
    const encodedPayload = token.split('.')[1];
    const rawPayload = atob(encodedPayload);
    const payload = JSON.parse(rawPayload);
    return payload.id;
  }

  public register(newUser: FormData): Promise<boolean> {
    const success = this.http.post(this.usersUrl + 'register', newUser, {observe: 'response'}).pipe(
      map((response: any) => {
        if (response.status === 200) {
          if (response.body.token) {
            const token = response.body.token;
            this.saveToken(token);
            const id = AuthenticationService.extractUserIdFromJwtToken(token);
            this.fetchProfile(id);

            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      }));
    
      return success.toPromise();
  }

  /**
   * Upon successful login, returns true, saves the JWT token and attempts to fetch the user profile as a side-effect.
   *
   * @returns true upon successful login, false otherwise.
   */
  public login(email: string, password: string): Promise<boolean> {

    const credentialsPayload = {email, password};

    // TODO error appears in the console when the server returns status 400, we should look into suppressing
    //  that error to avoid noise in the console.
    const observable = this.http.post(this.usersUrl + 'login', credentialsPayload, {observe: 'response'}).pipe(
      map((response: any) => {
        if (response.status === 200) {
          const body: any = response.body;
          if (body.token) {
            this.saveToken(body.token);
            const id = AuthenticationService.extractUserIdFromJwtToken(body.token);
            this.fetchProfile(id);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );

    return observable.toPromise();
  }

  public update(newUser: FormData): Promise<boolean> {
    const success = this.http.put(this.usersUrl + this.userProfile._id, newUser, {observe: 'response'}).pipe(
      map((response: any) => {
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      }));
    
      return success.toPromise();
  }

  public async updateFollowers(id: string) {
    const currentUserId = this.getUserProfile()._id;

    await this.http.put(this.usersUrl + 'followers/' + id, {currentUserId: currentUserId}).toPromise();
  }

  public resetPassword(email: string): Promise<boolean> {
    const success = this.http.post(this.usersUrl + 'reset-password', { email: email }, {observe: 'response'}).pipe(
      map( response => {
        if (response.status === 200) {
          return true;
        }

        return false;
      }),
      catchError(() => {
        return of(false);
      }));
    
      return success.toPromise();
  }

  public validPasswordToken(token: string): Promise<boolean> {
    const success = this.http.post(this.usersUrl + 'validate-password-token/' + token, '', {observe: 'response'}).pipe(
      map( response => {
        if (response.status === 200) {
          return true;
        }

        return false;
      }),
      catchError(() => {
        return of(false);
      }));
    
      return success.toPromise(); 
  }

  public newPassword(newPassword: string, resetToken: string): Promise<boolean> {
    const success = this.http.post(this.usersUrl + 'set-new-password', {newPassword, resetToken}, {observe: 'response'}).pipe(
      map( response => {
        if (response.status === 200) {
          return true;
        }

        return false;
      }),
      catchError(() => {
        return of(false);
      }));
    
      return success.toPromise();
  }
}
