import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from './meeting.model';

@Injectable({
  providedIn: 'root'
})

export class MeetingsService {
  private readonly meetingsUrl = '/api/meetings/';

  constructor(private http: HttpClient) {}

  public getMeetings(): Observable<Meeting[]> {
    // TODO on component destroy keep news (should be in component)
    // TODO add length constraint
    return this.http.get<Meeting[]>(this.meetingsUrl);
  }

  public getMeetingById(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(this.meetingsUrl + id);
  }

  public addMeeting(newMeeting: Meeting) {
    this.http.post<Meeting>(this.meetingsUrl, newMeeting);
  }

  public updateMeeting(updatedMeeting: Meeting) {
    this.http.put<Meeting>(this.meetingsUrl + updatedMeeting._id, updatedMeeting);
  }

  public deleteMeeting(id: string) {
    this.http.delete<Meeting>(this.meetingsUrl + id);
  }
}
