import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserProfile } from '../user-profile.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ResponseResetDialogComponent } from 'src/app/restore-password/response-reset/response-reset-dialog/response-reset-dialog.component';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public changeForm: FormGroup;
  public profile: UserProfile;
  private selectedImage: File;
  public selectedImageUrl: string | ArrayBuffer;
  public successfulSave: boolean;

  public isReadonlyMap = {
    'firstName': true,
    'lastName': true,
    'bio': true,
    'occupation': true,
    'web': true, 
    'github': true, 
    'linkedin': true, 
    'instagram': true, 
    'facebook': true, 
    'portfolio': true
  };

  constructor(private auth: AuthenticationService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.profile = this.auth.getUserProfile();

    this.changeForm = new FormGroup({
      firstName: new FormControl(this.profile.firstName, Validators.required),
      lastName: new FormControl(this.profile.lastName, Validators.required)
    });
  }

  get firstName() { return this.changeForm.get('firstName'); }
  get lastName() { return this.changeForm.get('lastName'); }

  public toNull(value: string) {
    if (value === undefined)
      return null;

    return value;
  }

  public onFileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.selectedImageUrl = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
      this.selectedImage = file;
    }
  }

  public onBlurFirstName(value: string) {
    this.profile.firstName = value;
    this.isReadonlyMap['firstName'] = true;
  }

  public onBlurLastName(value: string) {
    this.profile.lastName = value;
    this.isReadonlyMap['lastName'] = true;
  }

  public onBlurBio(value: string) {
    this.profile.bio = value;
    this.isReadonlyMap['bio'] = true;
  }

  public onBlurOccupation(value: string) {
    this.profile.occupation = value;
    this.isReadonlyMap['occupation'] = true;
  }

  public onBlurWeb(value: string) {
    this.profile.webUrl = value;
    this.isReadonlyMap['web'] = true;
  }

  public onBlurGithub(value: string) {
    this.profile.githubUrl = value;
    this.isReadonlyMap['github'] = true;
  }

  public onBlurLinkedin(value: string) {
    this.profile.linkedinUrl = value;
    this.isReadonlyMap['linkedin'] = true;
  }

  public onBlurInstagram(value: string) {
    this.profile.instagramUrl = value;
    this.isReadonlyMap['instagram'] = true;
  }

  public onBlurFacebook(value: string) {
    this.profile.facebookUrl = value;
    this.isReadonlyMap['facebook'] = true;
  }

  public onBlurPortfolio(value: string) {
    this.profile.portfolioUrl = value;
    this.isReadonlyMap['portfolio'] = true;
  }

  public onChangePassword() {
    this.dialog.open(ResponseResetDialogComponent);
  }

  public async onSave() {
    const jsonData = JSON.parse(JSON.stringify(this.profile));
    const formData = new FormData();

    Object.keys(jsonData).forEach(key => formData.append(key, jsonData[key]));
    if (this.selectedImage) formData.append('profilePicture', this.selectedImage);
    
    this.successfulSave = await this.auth.update(formData);

    if (this.successfulSave) {
      this.auth.updateProfile();
    }
  }
}
