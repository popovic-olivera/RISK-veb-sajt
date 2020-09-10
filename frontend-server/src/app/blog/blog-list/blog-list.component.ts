import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../blog-post.model';
import { BlogService } from '../blog.service';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css', '../../app.component.css']
})

export class BlogListComponent implements OnInit {
  @Input()
  public blogPosts: BlogPost[];
  message: string;
  public isProfile: boolean;

  constructor(private data: DataService, public auth: AuthenticationService) {}

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    if (this.message === 'profile-view') {
      this.isProfile = true;
    } else {
      this.isProfile = false;
    }
  }

}
