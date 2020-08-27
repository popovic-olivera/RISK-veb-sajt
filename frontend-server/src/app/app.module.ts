import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { OrganizationComponent } from './organization/organization.component';
import { ProjectsComponent } from './projects/projects.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { CreateBlogPostComponent } from './blog/create-blog-post/create-blog-post.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { MeetingsModule } from './meetings/meetings.module';
import { MaterialModule } from './material/material.module';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { ProfileBadgeComponent } from './profile/profile-badge/profile-badge.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';
import { BlogLayoutDirective } from './blog-layout.directive';
import { RegisterComponent } from './register/register.component';
import { MarkdownModule } from 'ngx-markdown';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { InfoDialogComponent } from './register/info-dialog/info-dialog.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    OrganizationComponent,
    ProjectsComponent,
    GalleryComponent,
    BlogListComponent,
    BlogPostComponent,
    CreateBlogPostComponent,
    LoginComponent,
    NavbarComponent,
    ProfileBadgeComponent,
    ProfileViewComponent,
    ProfileSettingsComponent,
    BlogLayoutDirective,
    RegisterComponent,
    InfoDialogComponent,
    RestorePasswordComponent
  ],
  imports: [
    BrowserModule,
    MeetingsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    MarkdownModule.forRoot(),
    NgxFileHelpersModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
