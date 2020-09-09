import { Component, OnInit } from '@angular/core';
import { ReadFile } from 'ngx-file-helpers';
import { BlogPost } from '../blog-post.model';
import { AuthenticationService } from '../../services/authentication.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { interval } from 'rxjs';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

enum StatusLevel {
  OK= 'OK',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  NONE = 'NONE',
}

class ChecklistInfo {
  public statusLevel: StatusLevel;
  public message: string;

  constructor(message: string, statusLevel: StatusLevel = StatusLevel.NONE) {
    this.message = message;
    this.statusLevel = statusLevel;
  }

  public getIconName(): string {
    switch (this.statusLevel) {
      case StatusLevel.OK:
        return 'checkmark';
      case StatusLevel.WARNING:
        return 'error_outline';
      case StatusLevel.ERROR:
        return 'clear';
      case StatusLevel.NONE:
        return null;
    }
  }

  public getStatusClass(): string {
    switch (this.statusLevel) {
      case StatusLevel.OK:
        return 'checklist-ok';
      case StatusLevel.WARNING:
        return 'checklist-warn';
      case StatusLevel.ERROR:
        return 'checklist-error';
      case StatusLevel.NONE:
        return 'checklist-disabled';
    }
  }
}

@Component({
  selector: 'app-create-blog-post',
  templateUrl: './create-blog-post.component.html',
  styleUrls: ['./create-blog-post.component.css']
})
export class CreateBlogPostComponent implements OnInit {

  constructor(private authService: AuthenticationService, private blogService: BlogService, private router: Router) { }

  public draftBlogPost: BlogPost = {
    _id: '',
    author_first_name: this.authService.getUserProfile().firstName,
    author_id: this.authService.getUserProfile()._id,
    author_image: this.authService.getUserProfile().profilePictureUrl,
    author_last_name: this.authService.getUserProfile().lastName,
    comments: [],
    content: '',
    date: new Date(),
    desc: '',
    header_image: 'assets/slika_zaglavlja_22_9.png',
    tags: [],
    title: '',
    url_id: ''
  };

  public headerImageMimeType: string;


  public content: string;
  public publishCheckList: Map<string, ChecklistInfo> = new Map([
    ['imageRatio', new ChecklistInfo('Odnos treba da bude 22:9')],
    ['imageResolution', new ChecklistInfo('Slika treba da bude široka barem 720 piksela')],
    ['title', new ChecklistInfo('Naslov nije postavljen', StatusLevel.ERROR)],
    ['desc', new ChecklistInfo('Opis nije postavljen', StatusLevel.ERROR)],
    ['content', new ChecklistInfo('Tekst nije napisan', StatusLevel.ERROR)]
  ]);

  public separatorKeyCodes = [ENTER, COMMA];

  public checkListHeaderConditions(): ChecklistInfo {
    // If the default image is used
    if (this.draftBlogPost.header_image.startsWith('assets')) {
      return new ChecklistInfo('Slika zaglavlja nije postavljena', StatusLevel.ERROR);
    }
    const ratio = this.publishCheckList.get('imageRatio').statusLevel;
    const resolution = this.publishCheckList.get('imageResolution').statusLevel;
    if (ratio === StatusLevel.NONE || resolution === StatusLevel.NONE) {
      return new ChecklistInfo('Slika zaglavlja nije postavljena', StatusLevel.ERROR);
    } else if (ratio === StatusLevel.ERROR || resolution === StatusLevel.ERROR) {
      return new ChecklistInfo('Slika zaglavlja ne ispunjava uslove', StatusLevel.ERROR);
    } else if (resolution === StatusLevel.WARNING) {
      // Ratio excluded as to not raise a unnecessary warning
      return new ChecklistInfo('Slika zaglavlja je dovoljno dobra, ali može biti bolja', StatusLevel.WARNING);
    } else if (ratio === StatusLevel.OK || resolution === StatusLevel.OK) {
      return new ChecklistInfo('Slika zaglavlja je postavljena', StatusLevel.OK);
    }
  }


  public canPublish(): boolean {
    return Array.from(this.publishCheckList.values()).filter(value => value.statusLevel === 'ERROR').length === 0;
  }

  public publish() {

    // Avoid these fields
    const avoid = ['_id', 'author_first_name', 'author_last_name', 'author_image',
      'comments', 'date', 'url_id'];

    const clone = Object.assign(this.draftBlogPost);

    avoid.forEach(excluded => {
      delete clone[excluded];
    })

    const response = this.blogService.createBlogPost(clone);
    response.subscribe(async response => {
      // TODO error handling
      localStorage.removeItem('draft-blog-post');
      localStorage.removeItem('header-image-mime-type');
      await this.router.navigate(['/blog/', response.url_id]);
    })
  }

  ngOnInit(): void {
    const locallyStored = localStorage.getItem('draft-blog-post');
    this.headerImageMimeType = localStorage.getItem('header-image-mime-type');
    if (locallyStored) {
      this.draftBlogPost = JSON.parse(locallyStored);
      // Trigger checklist functions manually
      this.propertyChanged('title', this.draftBlogPost.title);
      this.propertyChanged('desc', this.draftBlogPost.desc);
      this.propertyChanged('content', this.draftBlogPost.content);
      this.checkImageQuality(this.draftBlogPost.header_image);
    }
    // Save the draft blog post into the local storage
    interval(10000).subscribe(_ => {
      localStorage.setItem('draft-blog-post', JSON.stringify(this.draftBlogPost));
      localStorage.setItem('header-image-mime-type', this.headerImageMimeType);
    });
  }



  propertyChanged(property: 'title' |  'desc' | 'content', newValue: string) {
    switch (property.trim()) {
      case 'title':
        if (newValue) {
          this.publishCheckList.get('title').statusLevel = StatusLevel.OK;
          this.publishCheckList.get('title').message = 'Naslov je postavljen';
        } else {
          this.publishCheckList.get('title').statusLevel = StatusLevel.ERROR;
          this.publishCheckList.get('title').message = 'Naslov nije postavljen';
        }
        break;
      case 'desc':
        if (newValue.trim()) {
          this.publishCheckList.get('desc').statusLevel = StatusLevel.OK;
          this.publishCheckList.get('desc').message = 'Opis je postavljen';
        } else {
          this.publishCheckList.get('desc').statusLevel = StatusLevel.ERROR;
          this.publishCheckList.get('desc').message = 'Opis nije postavljen';
        }
        break;
      case 'content':
        if (newValue.trim()) {
          this.publishCheckList.get('content').statusLevel = StatusLevel.OK;
          this.publishCheckList.get('content').message = 'Tekst je napisan';
        } else {
          this.publishCheckList.get('content').statusLevel = StatusLevel.ERROR;
          this.publishCheckList.get('content').message = 'Tekst je napisan';
        }
        break;
    }
  }

  setHeader(file: ReadFile) {
    this.draftBlogPost.header_image = file.content;
    this.checkImageQuality(file.content);
  }

  private checkImageQuality(dataUrl: string) {
    const img = new Image();
    img.onload = event => {
      const loadedImg: any = event.currentTarget;
      const height = loadedImg.height;
      const width = loadedImg.width;
      const ratio = width / height;
      if (ratio > 2.5) {
        this.publishCheckList.get('imageRatio').statusLevel = StatusLevel.WARNING;
        this.publishCheckList.get('imageRatio').message = 'Slika je suviše široka i biće opsečena do odnosa 22:9';
      } else if (ratio > 2.3) {
        this.publishCheckList.get('imageRatio').statusLevel = StatusLevel.OK;
        this.publishCheckList.get('imageRatio').message = 'Odnos dimenzija je 16:9';
      } else if (ratio > 1.1) {
        this.publishCheckList.get('imageRatio').statusLevel = StatusLevel.WARNING;
        this.publishCheckList.get('imageRatio').message = 'Slika je suviše uska i biće opsečena do odnosa 22:9';
      } else {
        this.publishCheckList.get('imageRatio').statusLevel = StatusLevel.ERROR;
        this.publishCheckList.get('imageRatio').message = 'Slika mora biti vodoravna sa odnosom dimenzija približnim 22:9';
      }

      if (width > 1280) {
        this.publishCheckList.get('imageResolution').statusLevel = StatusLevel.OK;
        this.publishCheckList.get('imageResolution').message = 'Slika ima dovoljno visoku rezoluciju';
      } else if (width > 720) {
        this.publishCheckList.get('imageResolution').statusLevel = StatusLevel.WARNING;
        this.publishCheckList.get('imageResolution').message = 'Slika je ima dovoljno visoku rezoluciju, ali bi bila još bolja da je široka barem 1280 piksela';
      } else {
        this.publishCheckList.get('imageResolution').statusLevel = StatusLevel.ERROR;
        this.publishCheckList.get('imageResolution').message = 'Slika nema dovoljno visoku rezoluciju, potrebno je da široka barem 720 piksela';
      }
    };
    img.src = dataUrl;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value.trim()) {
      this.draftBlogPost.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public removeTag(tag: string) {
    const index = this.draftBlogPost.tags.indexOf(tag);
    if (index >= 0) {
      this.draftBlogPost.tags.splice(index, 1);
    }
  }
}
