import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MeetingsListComponent } from '../meetings/meetings-list/meetings-list.component';
import { OrganizationComponent } from '../organization/organization.component';
import { ProjectsComponent } from '../projects/projects.component';
import { BlogListComponent } from '../blog/blog-list/blog-list.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'okupljanja', component: MeetingsListComponent},
  { path: 'organizacija', component: OrganizationComponent},
  { path: 'projekti', component: ProjectsComponent},
  { path: 'blog', component: BlogListComponent},
  { path: 'galerija', component: GalleryComponent},
  { path: 'prijava', component: LoginComponent },
  { path: 'profil', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
