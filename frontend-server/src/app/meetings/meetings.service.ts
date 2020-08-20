import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from './meeting.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MeetingsService {
  private readonly meetingsUrl = '/api/meetings/';
  private readonly NUMBER_OF_VISIBLE_MEETINGS = 4;
  private meetings: Meeting[] = [];
  private visibleLen = this.NUMBER_OF_VISIBLE_MEETINGS;

  constructor(private http: HttpClient) {}

  public getMeetings(reload = false) {
    if (this.meetings.length !== 0 && !reload) {
      return ;
    }

    this.http.get<Meeting[]>(this.meetingsUrl)
             .pipe(map((m: Meeting[]) => {
                this.meetings = m.reverse();
              }))
             .toPromise();
  }

  public getShowingMeetings(): Meeting[] {
    return this.meetings.slice(0, this.visibleLen);
  }

  public loadMoreMeetings() {
    if (this.visibleLen !== this.meetings.length) {
      this.visibleLen += 1;
    }
  }

  public resetShowingLen(): void {
    this.visibleLen = this.NUMBER_OF_VISIBLE_MEETINGS;
  }

  public getMeetingById(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(this.meetingsUrl + id);
  }

  public addMeeting(newMeeting: Meeting) {
    this.http.post<Meeting>(this.meetingsUrl, newMeeting).toPromise();
    this.getMeetings(true); // TODO This works, but should be improved
  }

  public updateMeeting(updatedMeeting: Meeting) {
    this.http.put<Meeting>(this.meetingsUrl + updatedMeeting._id, updatedMeeting).toPromise();
  }

  public deleteMeeting(id: string) {
    this.http.delete<Meeting>(this.meetingsUrl + id).toPromise();
    this.getMeetings(true); // TODO This works, but should be improved
  }
}
