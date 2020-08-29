import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { Meeting } from '../meeting.model';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.css']
})

export class MeetingsListComponent implements OnInit {

  constructor(private meetingsService: MeetingsService) {}

  ngOnInit(): void {
    this.meetingsService.initMeetings(); 
  }

  get meetings(): Meeting[] {
    return this.meetingsService.getVisibleMeetings();
  }

  public showOlderMeetings() {
    this.meetingsService.showOlderMeetings();
  }

  public deleteMeeting(id: string) {
    this.meetingsService.deleteMeeting(id);
  }

  ngOnDestroy() {
    this.meetingsService.resetVisibleLen();
  }
}
