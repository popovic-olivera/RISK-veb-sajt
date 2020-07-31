import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../blog-post.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  public blogPosts: Observable<BlogPost[]>;

  constructor(private blogService: BlogService) {
    this.blogPosts = this.blogService.getBlogPosts();
  }

  ngOnInit(): void {
  }

}
