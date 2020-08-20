import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { Meeting } from '../meeting.model';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
  }

  public saveMeeting(heading: string, description: string, github: string) {
    const newMeeting = new Meeting(heading, description, github);
    this.meetingsService.addMeeting(newMeeting);
  }

  public saveEnabled(heading: string, description: string, github: string): boolean {
    if (heading !== '' && description !== '' && github !== '') {
      return true;
    }

    return false;
  }
}
