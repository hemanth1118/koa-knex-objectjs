import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListedUsersComponent } from './listed_users/listed-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'edit/:id',component: UpdateUserComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'listed_users', component: ListedUsersComponent },
  { path: 'delete_user/:id', component: ListedUsersComponent },
  { path: 'user_profile/:id', component: UserProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
