import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})

export class CreateMeetingComponent implements OnInit {
  public createMeetingForm: FormGroup;

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.createMeetingForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author_id: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      // date: new FormControl(null, Validators.required),
      // tags: new FormControl(null, []),
      // githubRepoUrl: new FormControl(null, [])
    });
  }

  get title() { return this.createMeetingForm.get('title'); }
  get author_id() { return this.createMeetingForm.get('author_id'); }
  get description() { return this.createMeetingForm.get('description'); }
  get date() { return this.createMeetingForm.get('date'); }
  // get tags() { return this.createMeetingForm.get('tags'); }
  // get githubRepoUrl() { return this.createMeetingForm.get('githubRepoUrl'); }

  public saveMeetingEnabled(): boolean {
    return this.createMeetingForm.valid;
  }

  public onSaveMeeting() {
    const jsonData = this.createMeetingForm.getRawValue();
    console.log(jsonData);
    
    this.meetingsService.addMeeting(jsonData);
  }
}
