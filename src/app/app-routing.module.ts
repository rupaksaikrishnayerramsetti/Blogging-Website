import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MyBlogListComponent } from './Components/my-blog-list/my-blog-list.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { BlogComponent } from './Components/blog/blog.component';
import { AuthGuardService } from './Services/Auth-Guard/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'my-blog-list', component: MyBlogListComponent, canActivate: [AuthGuardService]},
  {path: 'blog', component: BlogComponent, canActivate: [AuthGuardService]},
  { path: 'blog/:id', component: BlogComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
