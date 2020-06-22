import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'

@Injectable()
export class UserDetailsGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    // let id = route.paramMap.get('id')
    const userExists = !!this.authService.getUserProfile(+route.paramMap.get('id'))
    console.log(userExists)
    if (userExists != null) {
      return true
    } else {
      window.alert('no permission')
      this.router.navigate(['/notfound'])
      return false
    }
  }
}
