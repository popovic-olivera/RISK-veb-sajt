import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from './meeting.model';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserProfile } from '../profile/user-profile.model';

@Injectable({
  providedIn: 'root'
})

export class MeetingsService {
  private readonly meetingsUrl = '/api/meetings/';
  private readonly filterUsersUrl = '/api/user/filter';
  private readonly NUMBER_OF_VISIBLE_MEETINGS = 4;
  private meetings: Meeting[] = [];
  private visibleLen = this.NUMBER_OF_VISIBLE_MEETINGS;

  constructor(private http: HttpClient) {}

  public initMeetings() {
    if (this.meetings.length !== 0) {
      return ;
    }

    this.http.get<Meeting[]>(this.meetingsUrl)
             .pipe(map((m: Meeting[]) => {
                this.meetings = m.reverse();
              }))
             .toPromise();
  }

  public getVisibleMeetings(): Meeting[] {
    return this.meetings.slice(0, this.visibleLen);
  }

  public showOlderMeetings() {
    if (this.visibleLen !== this.meetings.length) {
      this.visibleLen += 1;
    }
  }

  public resetVisibleLen(): void {
    this.visibleLen = this.NUMBER_OF_VISIBLE_MEETINGS;
  }

  public async addMeeting(newMeeting: Meeting) {
    const addedMeeting = await this.http.post<Meeting>(this.meetingsUrl, newMeeting).toPromise();

    if (addedMeeting) {
      this.meetings.unshift(addedMeeting);
      this.visibleLen += 1;
    }
  }

  // TODO
  public updateMeeting(updatedMeeting: Meeting): void  {
    this.http.put<Meeting>(this.meetingsUrl + updatedMeeting._id, updatedMeeting).toPromise();
  }

  public deleteFromDatabase(id: string): Promise<boolean> {
    const success = this.http.delete<Meeting>(this.meetingsUrl + id, {observe: 'response'}).pipe(
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

  public async deleteMeeting(id: string) {
    const success = await this.deleteFromDatabase(id);

    if (success) {
      const index = this.meetings.findIndex(m => m._id === id);
      this.meetings.splice(index, 1);
      this.visibleLen -= 1;
    }
  }

  public getFilteredUsers(name: string): Promise<UserProfile[]> {
    return this.http.post<UserProfile[]>(this.filterUsersUrl, {"name": name}).toPromise();
  }
}
