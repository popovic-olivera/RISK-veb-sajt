import { Component, OnInit, Input, Output } from '@angular/core';
import { Meeting } from '../meeting.model';
import { Button } from './button.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  @Input() 
  public meeting: Meeting;
  public buttons: Button[] = [];

  @Output()
  public emitMeetingToDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    const urls = [[this.meeting.githubRepoUrl, 'Kod'],
                  [this.meeting.photosUrl, 'Slike'],
                  [this.meeting.posterUrl, 'Poster'],
                  [this.meeting.presentationUrl, 'Prezentacija'],
                  [this.meeting.surveyUrl, 'Utisci'],
                  [this.meeting.videoUrl, 'Video']];

    this.buttons = urls.filter((url) => { return url[0] !== undefined; })
                       .map((url) => { return new Button(url[0], url[1]); });
  }

  public onDeleteMeeting() {
    this.emitMeetingToDelete.emit(this.meeting._id);
  }
}
