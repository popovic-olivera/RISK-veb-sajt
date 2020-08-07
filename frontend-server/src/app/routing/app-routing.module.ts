import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { GatheringsComponent } from '../gatherings/gatherings.component';
import { OrganizationComponent } from '../organization/organization.component';
import { ProjectsComponent } from '../projects/projects.component';
import { BlogListComponent } from '../blog/blog-list/blog-list.component';
import { GalleryComponent } from '../gallery/gallery.component';
import {LoginComponent} from "../login/login.component";


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'okupljanja', component: GatheringsComponent},
  { path: 'organizacija', component: OrganizationComponent},
  { path: 'projekti', component: ProjectsComponent},
  { path: 'blog', component: BlogListComponent},
  { path: 'galerija', component: GalleryComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
