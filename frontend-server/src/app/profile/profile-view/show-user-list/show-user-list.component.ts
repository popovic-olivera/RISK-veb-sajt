import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/restore-password/message-dialog/message-dialog.component';
import { UserProfile } from '../../user-profile.model';
import { ProfileService } from '../../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-user-list',
  templateUrl: './show-user-list.component.html',
  styleUrls: ['./show-user-list.component.css']
})
export class ShowUserListComponent implements OnInit {
  public users: UserProfile[] = [];

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
              private profileService: ProfileService, private router: Router) {
                
                data.users.forEach(async (id: string) => {
                  const user = await this.profileService.getProfileById(id).toPromise();

                  this.users.push(user);
                });
              }

  ngOnInit(): void {
  }

  public onClick(user: UserProfile) {
    this.router.navigate(['/profil', user._id]);
    this.dialogRef.close();
  }
}
