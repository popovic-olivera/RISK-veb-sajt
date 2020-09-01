import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../profile/user-profile.model';

@Injectable({
  providedIn: 'root'
})

export class FilterUsersService {
  private readonly filterUsersUrl = '/api/user/filter';

  constructor(private http: HttpClient) { }

  public getFilteredUsers(name: string): Promise<UserProfile[]> {
    return this.http.post<UserProfile[]>(this.filterUsersUrl, {"name": name}).toPromise();
  }
}
