import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserProfile } from 'src/app/profile/user-profile.model';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})

export class CreateMeetingComponent implements OnInit {
  public createMeetingForm: FormGroup;
  public users: UserProfile[];
  public selectedUser: UserProfile;

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.createMeetingForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author_name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl({value: null, disabled: true}, Validators.required),
      githubRepoUrl: new FormControl(null, []),
      tags: new FormControl(null, []),
      posterUrl: new FormControl(null, Validators.required),
      presentationUrl: new FormControl(null, []),
      videoUrl: new FormControl(null, []),
      surveyUrl: new FormControl(null, [])
    });
  }

  get title() { return this.createMeetingForm.get('title'); }
  get author_name() { return this.createMeetingForm.get('author_name'); }
  get description() { return this.createMeetingForm.get('description'); }
  get date() { return this.createMeetingForm.get('date'); }

  public saveMeetingEnabled(): boolean {
    return this.createMeetingForm.valid;
  }

  public onSaveMeeting() {
    const jsonData = this.createMeetingForm.getRawValue();
    jsonData["author_id"] = this.selectedUser._id;
    jsonData["tags"] = jsonData["tags"].split(",")
                                       .map((word: string) => word.trim())
                                       .filter((word: string) => word !== "");

    this.meetingsService.addMeeting(jsonData);
  }

  public async filterUsers(name: string) {
    if (name !== "") {
      this.users = await this.meetingsService.getFilteredUsers(name);
    }
  }

  public onSelectionChanged(user: UserProfile) {
    const authorName = this.author_name;

    authorName.setValue(user.firstName + " " + user.lastName);
    this.selectedUser = user;
  }
}
