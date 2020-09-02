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
  private filterValue: string;

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
    let meetings =  this.meetingsService.getVisibleMeetings();

    if (this.filterValue) {
      const key = this.filterValue.toLowerCase();

      meetings = meetings.filter( (meeting: Meeting) => {
        return meeting.title.toLowerCase().includes(key) ||
        meeting.tags.map( (word: string) => { return word.toLowerCase(); })
                    .filter( (word: string) => { return word.includes(key); } ).length > 0;
      });
    }

    return meetings;
  }

  public showOlderMeetings() {
    this.meetingsService.showOlderMeetings();
  }

  public deleteMeeting(id: string) {
    this.meetingsService.deleteMeeting(id);
  }

  public onInputChange(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value.trim();
  }

  ngOnDestroy() {
    this.meetingsService.resetVisibleLen();
  }
}
