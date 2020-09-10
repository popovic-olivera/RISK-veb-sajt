import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogPost } from '../blog/blog-post.model';
import { BlogService } from '../blog/blog.service';
import { MeetingsService } from '../meetings/meetings.service';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  public latestPost: BlogPost;
  public blogPosts: BlogPost[] = [];
  private subscription: Subscription;

  constructor(private blogService: BlogService,
              public meetingService: MeetingsService,
              public auth: AuthenticationService,
              private data: DataService) {
    this.blogService.getBlogPosts().subscribe(post => this.latestPost = post.reverse()[0]);

    this.initBlogPosts();
  }

  ngOnInit(): void {
    this.subscription = this.auth.userChanged.subscribe(
      value => {
        if (value) this.initBlogPosts();
      }
    );

    this.data.changeMessage('profile-view');
  }

  private initBlogPosts() {
    const profile = this.auth.getUserProfile();

    if (!profile) return;

    const following: string[] = profile.following;

    this.blogService.getBlogPosts().subscribe(
      data => this.blogPosts = data.filter((post: BlogPost) => {
        return following.includes(post.author_id);
      }).reverse()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
