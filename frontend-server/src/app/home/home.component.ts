import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../blog/blog-post.model';
import { BlogService } from '../blog/blog.service';
import { reduce, map, flatMap, first } from 'rxjs/operators';
import { Meeting } from '../meetings/meeting.model';
import { MeetingsService } from '../meetings/meetings.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
  public latestPost: BlogPost;
  // public latestMeeting: Meeting;

  constructor(private blogService: BlogService,
              public meetingService: MeetingsService,
              public auth: AuthenticationService) {
    this.blogService.getBlogPosts().subscribe(data => this.latestPost = data[0]);
    // this.latestMeeting = this.meetingService.getVisibleMeetings()[0];
  }

  ngOnInit(): void {
  }

}
