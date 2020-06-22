import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { AppRoutingModule } from './app-routing.module'
// import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './auth.interceptor'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ListedUsersComponent } from './listed_users/listed-users.component'
import { UpdateUserComponent } from './update-user/update-user.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { TaskComponent } from './task/task.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DatePipe } from '@angular/common'
import { PageNotFoundComponent } from './page-not-found.component'
import { UserDetailsGuardService } from './user-details-guard.service'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ListedUsersComponent,
    UpdateUserComponent,
    UserProfileComponent,
    TaskComponent,
    PageNotFoundComponent,
    DashboardComponent,
    NavigationComponent
    // NgbModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    NgxChartsModule,
  ],
  providers: [
    DatePipe,
    UserDetailsGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
