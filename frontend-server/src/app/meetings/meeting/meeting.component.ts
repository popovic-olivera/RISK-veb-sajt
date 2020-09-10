import { Component, OnInit, Input, Output, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { Meeting } from '../meeting.model';
import { Button } from './button.model';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MeetingsService } from '../meetings.service';
import { FilterUsersService } from 'src/app/services/filter-users.service';
import { UserProfile } from 'src/app/profile/user-profile.model';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit, AfterViewInit {
  public updateForm: FormGroup;
  public users: UserProfile[];
  public selectedUser: UserProfile;

  public canEdit = false;
  public titleCopy: string;
  public authorNameCopy: string;
  public dateCopy: string;
  public descCopy: string;

  @ViewChild('image')
  elem: ElementRef;

  @Input()
  public meeting: Meeting;
  public presentation: File;
  public posterImage: File;
  public image: File;
  public buttons: Button[] = [];

  @Output()
  public emitMeetingToDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,
              public auth: AuthenticationService,
              private renderer: Renderer2,
              private meetingsService: MeetingsService,
              private filterService: FilterUsersService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const urls = [[this.meeting.githubRepoUrl, 'githubRepoUrl'],
                  [this.meeting.surveyUrl, 'surveyUrl'],
                  [this.meeting.videoUrl, 'videoUrl'],
                  [this.meeting.presentationUrl, 'presentationUrl']];

    this.buttons = urls.filter(url => { if (url[0] !== ' ' && url[0] !== 'null') {return true; }})
                       .map((url) => new Button(url[0], url[1]));

    this.updateForm = this.fb.group({
      title: [''],
      authorName: [''],
      date: [''],
    });

  }

  get title() { return this.updateForm.get('title'); }
  get authorName() { return this.updateForm.get('authorName'); }
  get date() { return this.updateForm.get('date'); }

  ngAfterViewInit(): void {
    if (this.elem) {
      if (window.innerWidth < 960) {
        this.unsetRadius();
      } else {
        this.setRadius();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.elem) {
      if (event.target.innerWidth < 960) {
        this.unsetRadius();
      } else {
        this.setRadius();
      }
    }
  }

  public goToAuthorPage() {
    if (this.meeting.authorID) {
      this.router.navigate(['/profil', this.meeting.authorID]);
    }
  }

  public onDeleteMeeting() {
    this.emitMeetingToDelete.emit(this.meeting._id);
  }

  setRadius(): void {
    this.renderer.setStyle(this.elem.nativeElement.querySelector('img'), 'border-radius', '20px');
  }

  unsetRadius(): void {
    this.renderer.setStyle(this.elem.nativeElement.querySelector('img'), 'border-top-left-radius', '0px');
    this.renderer.setStyle(this.elem.nativeElement.querySelector('img'), 'border-top-right-radius', '0px');
  }

  public onPresentationInput(event: Event) {
    this.presentation = (event.target as HTMLInputElement).files[0];
  }

  public onPosterInput(event: Event) {
    this.posterImage = (event.target as HTMLInputElement).files[0];
  }

  public onImageInput(event: Event) {
    this.image = (event.target as HTMLInputElement).files[0];
  }

  public setEditable(): void {
    this.canEdit = true;

    this.titleCopy = this.meeting.title;
    this.authorNameCopy = this.meeting.authorName;
    this.dateCopy = this.meeting.date;
    this.descCopy = this.meeting.description;
  }

  public confirmEdit(): void {
    this.canEdit = false;

    this.ngOnInit();

    const jsonData = JSON.parse(JSON.stringify(this.meeting));
    const formData = new FormData();

    Object.keys(jsonData).forEach(key => formData.append(key, jsonData[key]));

    if (this.posterImage) {
      formData.append('poster', this.posterImage);
    }

    if (this.presentation) {
      formData.append('presentation', this.presentation);
    }

    if (this.image) {
      formData.append('image', this.image);
    }

    this.meetingsService.updateMeeting(formData, this.meeting._id);
  }

  public cancelEdit(): void {
    this.canEdit = false;

    this.meeting.title = this.titleCopy;
    this.meeting.authorName = this.authorNameCopy;
    this.meeting.date = this.dateCopy;
    this.meeting.description = this.descCopy;
  }

  public saveMeetingEnabled(): boolean {
    return this.updateForm.valid;
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
    this.meeting.authorImage = this.selectedUser.profilePictureUrl;
  }

  public processText(text: string) {
    if (text === 'null' || !text) {
      return '';
    }

    return text;
  }
}
