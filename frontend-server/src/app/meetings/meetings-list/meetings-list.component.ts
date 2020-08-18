import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { Meeting } from '../meeting.model';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.css']
})

export class MeetingsListComponent implements OnInit {
  public meetings: Meeting[]; 

  constructor(private meetingsService: MeetingsService) {}

  ngOnInit(): void {
    this.meetingsService.getMeetings().subscribe(
      meetings => this.meetings = meetings,
      error => console.error(error)
    );
  }

}
