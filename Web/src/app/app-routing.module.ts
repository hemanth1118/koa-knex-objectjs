import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { ListedUsersComponent } from './listed_users/listed-users.component'
import { UpdateUserComponent } from './update-user/update-user.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { TaskComponent } from './task/task.component'
import { PageNotFoundComponent } from './page-not-found.component'
import { UserDetailsGuardService } from './user-details-guard.service'
import { AuthGuard } from './auth.guard'
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'edit/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'listed_users',
    component: ListedUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'delete_user/:id',
    component: ListedUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user_profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: 'edit_task/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: NavigationComponent, canActivate: [AuthGuard] },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
