import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting } from './meeting.model';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MeetingsService {
  private readonly meetingsUrl = '/api/meetings/';
  private readonly NUMBER_OF_VISIBLE_MEETINGS = 4;
  private meetings: Meeting[] = [];
  private visibleLen = this.NUMBER_OF_VISIBLE_MEETINGS;

  constructor(private http: HttpClient) {
    this.initMeetings();
  }

  public async initMeetings() {
    if (this.meetings.length !== 0) {
      return ;
    }

    this.meetings = await this.http.get<Meeting[]>(this.meetingsUrl).toPromise();
    this.meetings = this.meetings.reverse();
  }

  public getVisibleMeetings(): Meeting[] {
    return this.meetings.slice(0, this.visibleLen);
  }

  public showOlderMeetings() {
    if (this.visibleLen !== this.meetings.length) {
      this.visibleLen += 2;
    }
  }

  public resetVisibleLen(): void {
    this.visibleLen = this.NUMBER_OF_VISIBLE_MEETINGS;
  }

  public async addMeeting(newMeeting: FormData) {
    const addedMeeting = await this.http.post<Meeting>(this.meetingsUrl, newMeeting).toPromise();

    if (addedMeeting) {
      this.meetings.unshift(addedMeeting);
      this.visibleLen += 1;
    }
  }

  public updateInDatabase(updatedMeeting: Meeting): Promise<boolean>  {
    const success = this.http.put<Meeting>(this.meetingsUrl + updatedMeeting._id, updatedMeeting, {observe: 'response'}).pipe(
      map( response => response.status === 200),
      catchError(() => {
        return of(false);
      }));

    return success.toPromise();
  }

  public async updateMeeting(updatedMeeting: Meeting) {
    const success = await this.updateInDatabase(updatedMeeting);

    if (success) {
      const index = this.meetings.findIndex(m => m._id === updatedMeeting._id);
      this.meetings.splice(index, 1, updatedMeeting);
    }
  }

  public deleteFromDatabase(id: string): Promise<boolean> {
    const success = this.http.delete<Meeting>(this.meetingsUrl + id, {observe: 'response'}).pipe(
      map( response => response.status === 200),
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
}
