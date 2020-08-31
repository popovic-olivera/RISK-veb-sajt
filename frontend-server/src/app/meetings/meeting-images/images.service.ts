import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from './images.model';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {
  private readonly imagesUrl = '/api/images';

  constructor(private http: HttpClient) { }

  public getMeetingImages(): Promise<Image[]> {
    return this.http.get<Image[]>(this.imagesUrl + '/meetings').toPromise();
  }
}
