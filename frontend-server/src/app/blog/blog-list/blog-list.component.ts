import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../blog-post.model';
import { BlogService } from '../blog.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogPosts: Observable<BlogPost[]>;
  message: string;
  isProfile: boolean;

  constructor(private blogService: BlogService, private data: DataService) {
    this.blogPosts = this.blogService.getBlogPosts();
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    if (this.message === 'profile-view') {
      this.isProfile = true;
    } else {
      this.isProfile = false;
    }
  }

}
