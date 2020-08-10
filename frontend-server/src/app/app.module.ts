import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './routing/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GatheringsComponent } from './gatherings/gatherings.component';
import { OrganizationComponent } from './organization/organization.component';
import { ProjectsComponent } from './projects/projects.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { CreateBlogPostComponent } from './blog/create-blog-post/create-blog-post.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './blog/blog.service';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    GatheringsComponent,
    OrganizationComponent,
    ProjectsComponent,
    GalleryComponent,
    BlogListComponent,
    BlogPostComponent,
    CreateBlogPostComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
