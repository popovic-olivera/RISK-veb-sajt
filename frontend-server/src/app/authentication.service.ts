import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserProfile } from './profile/user-profile.model';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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

  public async logout() {
    this.token = undefined;
    this.userProfile = undefined;
    window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('user-profile');
    await this.router.navigateByUrl('/');
  }

  private fetchProfile(id: string): void {
    this.http.get<UserProfile>(
      `api/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      }
    ).subscribe((profile) => {
      this.saveUserProfile(profile);
    });
  }

  public register(email: string, password: string) {
    this.http.post(`api/user/register`, {email, password}).subscribe((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
        const id = AuthenticationService.extractUserIdFromJwtToken(data.token);
        this.fetchProfile(id);
      }
      return data;
    });
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
    const observable = this.http.post('api/user/login', credentialsPayload, {observe: 'response'}).pipe(
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

  private static extractUserIdFromJwtToken(token: string): string {
      const encodedPayload = token.split('.')[1];
      const rawPayload = atob(encodedPayload);
      const payload = JSON.parse(rawPayload);
      return payload.id;
  }


}
