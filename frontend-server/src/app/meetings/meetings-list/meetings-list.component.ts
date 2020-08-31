import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { Meeting } from '../meeting.model';
import { Image } from '../meeting-images/images.model';
import { ImagesService } from '../meeting-images/images.service';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.css']
})

export class MeetingsListComponent implements OnInit {
  public images: Image[];

  constructor(private meetingsService: MeetingsService,
              private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.meetingsService.initMeetings(); 
    this.initImages();
  }

  async initImages() {
    this.images = await this.imagesService.getMeetingImages();
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
