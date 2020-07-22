import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { GatheringsComponent } from '../gatherings/gatherings.component';
import { OrganizationComponent } from '../organization/organization.component';
import { ProjectsComponent } from '../projects/projects.component';
import { BlogComponent } from '../blog/blog.component';
import { GalleryComponent } from '../gallery/gallery.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'okupljanja', component: GatheringsComponent},
  { path: 'organizacija', component: OrganizationComponent},
  { path: 'projekti', component: ProjectsComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'galerija', component: GalleryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
