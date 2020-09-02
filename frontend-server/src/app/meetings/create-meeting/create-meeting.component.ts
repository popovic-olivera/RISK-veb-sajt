import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserProfile } from 'src/app/profile/user-profile.model';
import { FilterUsersService } from 'src/app/services/filter-users.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})

export class CreateMeetingComponent implements OnInit {
  public createMeetingForm: FormGroup;
  public users: UserProfile[];
  public selectedUser: UserProfile;

  constructor(private meetingsService: MeetingsService, 
              private filterService: FilterUsersService) { }

  ngOnInit(): void {
    this.createMeetingForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      authorName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      githubRepoUrl: new FormControl(null, []),
      tags: new FormControl(null, []),
      posterUrl: new FormControl(null, Validators.required),
      presentationUrl: new FormControl(null, []),
      videoUrl: new FormControl(null, []),
      surveyUrl: new FormControl(null, [])
    });
  }

  get title() { return this.createMeetingForm.get('title'); }
  get authorName() { return this.createMeetingForm.get('authorName'); }
  get description() { return this.createMeetingForm.get('description'); }
  get date() { return this.createMeetingForm.get('date'); }

  public saveMeetingEnabled(): boolean {
    return this.createMeetingForm.valid;
  }

  public async filterUsers(name: string) {
    if (name !== "") {
      this.users = await this.filterService.getFilteredUsers(name);
    }
  }

  public onSelectionChanged(user: UserProfile) {
    const authorName = this.authorName;

    authorName.setValue(user.firstName + " " + user.lastName);
    this.selectedUser = user;
  }

  public onSaveMeeting() {
    const jsonData = this.createMeetingForm.getRawValue();

    if (this.selectedUser) {
      jsonData["authorID"] = this.selectedUser._id;
      jsonData["authorImage"] = this.selectedUser.profilePictureUrl;
    }
    
    if (jsonData["tags"]) {
      jsonData["tags"] = jsonData["tags"].split(",")
                                       .map((word: string) => word.trim())
                                       .filter((word: string) => word !== "");
    }
    
    this.meetingsService.addMeeting(jsonData);
    this.createMeetingForm.reset();
  }
}
