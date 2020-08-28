import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResponseResetDialogComponent } from './response-reset-dialog/response-reset-dialog.component';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})

export class ResponseResetComponent implements OnInit {
  public currentState: string;
  private resetToken: string;

  constructor(private auth: AuthenticationService, private route: ActivatedRoute, public dialog: MatDialog) { 
    this.currentState = 'Wait';

    this.route.params.subscribe( params => {
      this.resetToken = params.token;
      this.verifyToken();
    });
  }

  ngOnInit(): void {}

  public async verifyToken() {
    const success = await this.auth.validPasswordToken(this.resetToken);

    if (success) {
      this.currentState = 'Verified';
      this.dialog.open(ResponseResetDialogComponent, {
        data: {resetToken: this.resetToken}
      });
    } else {
      this.currentState = 'NotVerified';
    }
  }
}
