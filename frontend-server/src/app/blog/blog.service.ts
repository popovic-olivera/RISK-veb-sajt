import { Injectable } from '@angular/core';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { Observable } from 'rxjs';
import { BlogPost } from './blog-post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends HttpErrorHandler {
  private blogPosts: Observable<BlogPost[]>;
  private readonly blogPostsUrl = '/api/blogPosts/';

  constructor(private http: HttpClient, router: Router) {
    super(router);
    this.refreshBlogPosts();
  }

  private refreshBlogPosts(): Observable<BlogPost[]> {
    this.blogPosts = this.http
      .get<BlogPost[]>(this.blogPostsUrl)
      .pipe(catchError(super.handleError()));
    return this.blogPosts;
  }

  public getBlogPosts(): Observable<BlogPost[]> {
    return this.blogPosts;
  }

  public getBlogPostById(id: string): Observable<BlogPost> {
    return this.http
      .get<BlogPost>(this.blogPostsUrl + id)
      .pipe(catchError(super.handleError()));
  }

  public async getBlogPostsByAuthorId(id: string) {
    return await this.blogPosts.pipe(map(
      posts => posts.filter(post => post.author_id === id)
    )).toPromise();
  }

  public createBlogPost(data): Observable<BlogPost> {
    return this.http
      .post<BlogPost>(this.blogPostsUrl, data)
      .pipe(catchError(super.handleError()));
  }
}
