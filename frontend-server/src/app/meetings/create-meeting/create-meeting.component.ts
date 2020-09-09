import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/profile/user-profile.model';
import { FilterUsersService } from 'src/app/services/filter-users.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS} from './format.datepicker';
import { ImagesService } from '../meeting-images/images.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class CreateMeetingComponent implements OnInit {
  public createMeetingForm: FormGroup;
  public users: UserProfile[];

  public selectedUser: UserProfile;
  public image: File;
  public posterImage: File;
  public presentation: File;

  constructor(private meetingsService: MeetingsService,
              private filterService: FilterUsersService, private imgService: ImagesService) { }

  ngOnInit(): void {
    this.createMeetingForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      authorName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      githubRepoUrl: new FormControl(null, []),
      tags: new FormControl(null, []),
      videoUrl: new FormControl(null, []),
      surveyUrl: new FormControl(null, []),
      posterImg: new FormControl(null, Validators.required)
    });
  }

  get title() { return this.createMeetingForm.get('title'); }
  get authorName() { return this.createMeetingForm.get('authorName'); }
  get description() { return this.createMeetingForm.get('description'); }
  get date() { return this.createMeetingForm.get('date'); }
  get posterImg() { return this.createMeetingForm.get('posterImg'); }

  public onPresentationInput(event: Event) {
    this.presentation = (event.target as HTMLInputElement).files[0];
  }

  public onPosterInput(event: Event) {
    this.posterImage = (event.target as HTMLInputElement).files[0];
  }

  public onImageInput(event: Event) {
    this.image = (event.target as HTMLInputElement).files[0];
  }

  public async filterUsers(name: string) {
    if (name !== '') {
      this.users = await this.filterService.getFilteredUsers(name);
    }
  }

  public onSelectionChanged(user: UserProfile) {
    const authorName = this.authorName;

    authorName.setValue(user.firstName + ' ' + user.lastName);
    this.selectedUser = user;
  }

  public saveMeetingEnabled(): boolean {
    return this.createMeetingForm.valid;
  }

  public async onSaveMeeting() {
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

    const formData = new FormData();
    Object.keys(jsonData).forEach(key => formData.append(key, jsonData[key]));
    formData.append('poster', this.posterImage);
    formData.append('presentation', this.presentation);
    formData.append('image', this.image);

    await this.meetingsService.addMeeting(formData);

    this.imgService.updateMeetingImages();
    this.resetForm();
  }

  private resetForm() {
    this.createMeetingForm.reset();
    this.selectedUser = undefined;
    this.posterImage = undefined;
    this.presentation = undefined;
    this.image = undefined;
  }
}
