import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  public heading: string;
  public body: string;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
      
    if (data.resetSuccessful) {
      this.heading = 'Proveri mejl';
      this.body = 'Mejl sa uputstvom za promenu lozinke bi trebalo da stigne svakog trenutka.';
    } else if (data.resetFailed) {
      this.heading = 'Promena nije uspela...';
      this.body = 'Proverite da li ste dobro uneli imejl adresu.';
    } else if (data.changeSuccessful) {
      this.heading = 'Uspešno promenjena lozinka!';
      this.body = 'Prijavite se da nastavite.';
    } else if (data.changeFailed) {
      this.heading = 'Promena nije uspela...';
      this.body = 'Došlo je do greške.';
    }
  }

  ngOnInit(): void {
  }

}
