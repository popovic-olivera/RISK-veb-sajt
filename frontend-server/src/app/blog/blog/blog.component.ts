import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-post.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  public blogPosts: BlogPost[];

  constructor(private blogService: BlogService, private dataService: DataService) { 
    this.blogService.getBlogPosts().subscribe(
      data => this.blogPosts = data.reverse()
    );
  }

  ngOnInit(): void {
    this.dataService.changeMessage('blog');
  }

}
