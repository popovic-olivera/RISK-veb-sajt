import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  public blogPosts: BlogPost[];

  constructor(private blogService: BlogService) { 
    this.blogService.getBlogPosts().subscribe(
      data => this.blogPosts = data
    );
  }

  ngOnInit(): void {
  }

}
