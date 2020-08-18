import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../meeting.model';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  @Input() 
  public meeting: Meeting;

  constructor() { }

  ngOnInit(): void {
  }

}
