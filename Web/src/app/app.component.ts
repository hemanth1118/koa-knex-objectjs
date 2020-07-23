import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: AuthService) { }
  loginUser
  ngOnInit() {
    // this.loginUser = this.authService.getUsername()
    // console.log(this.loginUser)
  }
  logout() {
    this.authService.logout();
  }
}
