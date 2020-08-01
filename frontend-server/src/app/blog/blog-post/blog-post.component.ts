import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../blog-post.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnDestroy {
  public blogPost: BlogPost;
  private activeSubs: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.activeSubs = [];
    this.findBlogPostById();
  }

  private findBlogPostById() {
    const getBlogPostSub = this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((blogPostIdParam) =>
          this.blogService.getBlogPostById(blogPostIdParam)
        )
      )
      .subscribe((blogPost) => (this.blogPost = blogPost));
    this.activeSubs.push(getBlogPostSub);
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

}
