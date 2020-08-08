import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userProfile: UserProfile;
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

  public async logout() {
    this.token = undefined;
    this.userProfile = undefined;
    window.localStorage.removeItem('auth-token');
    await this.router.navigateByUrl('/');
  }

  private fetchProfile(): void {
    this.http.get<UserProfile>(
      'api/user/profile',
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      }
    ).subscribe((profile) => {
      this.userProfile = profile;
    });
  }

  public register(email: string, password: string) {

    this.http.post(`api/user/register`, {email, password}).subscribe((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
        this.fetchProfile();
      }
      return data;
    });
  }

  public login(email: string, password: string) {

    const credentialsPayload = {email, password};
    this.http.post('api/user/login', credentialsPayload).subscribe((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
        this.fetchProfile();
      }
    });
  }



}
