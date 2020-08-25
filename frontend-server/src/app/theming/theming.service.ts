import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  public prefersDarkTheme = false;

  constructor(private mediaMatcher: MediaMatcher) {
    const mediaQueryList = mediaMatcher.matchMedia('(prefers-color-scheme: dark)');
    this.prefersDarkTheme = mediaQueryList.matches;
    mediaQueryList.addEventListener('change', () => {
      this.prefersDarkTheme = mediaQueryList.matches;
    });
  }
}
