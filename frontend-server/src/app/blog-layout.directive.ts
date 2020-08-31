import { Directive, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Directive({
  selector: '[appBlogLayout]'
})
export class BlogLayoutDirective implements OnInit {
  message: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
    if (this.message === 'blog-list') {
      this.data.changeMessage('default');
    } else if (this.message === 'profile-view') {
      this.data.changeMessage('default');
    }
  }

}
