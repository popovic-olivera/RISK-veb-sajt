import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from './images.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {
  private readonly imagesUrl = '/api/images';
  private images: Image[] = [];
  public imagesChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.initMeetingImages();
  }

  private initMeetingImages() {
    this.http.get<Image[]>(this.imagesUrl + '/meetings').subscribe(
      data => {
        this.images = data;
        this.imagesChanged.next(true);
      } 
    );
  }

  public getMeetingImages() {
    return this.images;
  }

  public updateMeetingImages() {
    this.initMeetingImages();
  }
}
