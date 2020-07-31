import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlogPostComponent } from './create-blog-post.component';

describe('CreateBlogPostComponent', () => {
  let component: CreateBlogPostComponent;
  let fixture: ComponentFixture<CreateBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
