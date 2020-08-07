import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface UserDetails {
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

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
    this.token = '';
    window.localStorage.removeItem('auth-token');
    await this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails | undefined {
    const token = this.getToken();
    if (token) {
      // Because the token is in the following form: "Bearer xxxxxxxx"
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private profile(user: TokenPayload): Observable<any> {

    return this.http.get(
      'user/profile',
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      }
    );
  }

  public register(user: TokenPayload): Observable<any> {

    return this.http.post(`/user/register`, user).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
      })
    );
  }

  public login(user: TokenPayload): Observable<any> {

    return this.http.post('api/user/login', user).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
      })
    );
  }



}
