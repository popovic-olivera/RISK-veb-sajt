import { Component, OnInit } from '@angular/core';
import { ReadFile } from 'ngx-file-helpers';

enum StatusLevel {
  OK= 'OK',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  NONE = 'NONE'
}

class ChecklistInfo {
  public statusLevel: StatusLevel = StatusLevel.NONE;
  public message: string;


  constructor(defaultMessage: string) {
    this.message = defaultMessage;
  }
}

@Component({
  selector: 'app-create-blog-post',
  templateUrl: './create-blog-post.component.html',
  styleUrls: ['./create-blog-post.component.css']
})
export class CreateBlogPostComponent implements OnInit {

  public content: string;
  public ratioInfo = new ChecklistInfo('Odnos treba da bude 16:9');
  public resolutionInfo = new ChecklistInfo('Slika treba da bude široka barem 720 piksela');
  public file: ReadFile;

  getIconName(statusLevel: StatusLevel): string {
    switch (statusLevel) {
      case StatusLevel.OK:
        return 'checkmark';
      case StatusLevel.WARNING:
        return 'error_outline';
      case StatusLevel.ERROR:
        return 'clear';
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

  onFilePicked(file: ReadFile) {
    const img = new Image();
    img.onload = event => {
      const loadedImg: any = event.currentTarget;
      const height = loadedImg.height;
      const width = loadedImg.width;
      const ratio = width / height;
      if (ratio > 1.9) {
        this.ratioInfo = {statusLevel: StatusLevel.WARNING, message: 'Slika je suviše široka i biće opsečena do odnosa 16:9'};
      } else if (ratio > 1.6) {
        this.ratioInfo = {statusLevel: StatusLevel.OK, message: 'Odnos dimenzija je 16:9'};
      } else if (ratio > 1) {
        this.ratioInfo = {statusLevel: StatusLevel.WARNING, message: 'Slika je suviše uska i biće opsečena do odnosa 16:9'};
      } else {
        this.ratioInfo = {statusLevel: StatusLevel.ERROR, message: 'Slika mora biti vodoravna sa odnosom dimenzija približnim 16:9'};
      }

      if (width > 1280) {
        this.resolutionInfo = {statusLevel: StatusLevel.OK, message: 'Slika ima dovoljno visoku rezoluciju'};
      } else if (width > 720) {
        this.resolutionInfo = {statusLevel: StatusLevel.WARNING, message: 'Slika je dobra, ali bi bila još bolja da je široka barem 1280 piksela'};
      } else {
        this.resolutionInfo = {statusLevel: StatusLevel.ERROR, message: 'Slika nema dovoljno visoku rezoluciju, potrebno je da široka barem 720 piksela'};
      }
    };
    img.src = file.content;
    this.file = file;
  }
}
