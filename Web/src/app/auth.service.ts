import { Injectable } from '@angular/core'

import { Router } from '@angular/router'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { User } from './user'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:3000'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'access-control-allow-origin': 'http://localhost:4200',
  })
  isEditRoute: boolean = false
  // currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router) {}
  signup(user: User): Observable<any> {
    console.log('signup() service initiated')
    return this.httpClient
      .post(`${this.API_URL}/signup`, user)
      .pipe(catchError(this.handleError))
  }

  login(user: User) {
    if (user.email.length !== 0 && user.password.length !== 0) {
      return this.httpClient
        .post(`${this.API_URL}/login`, user)
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.token)
          this.router.navigate(['listed_users'])
        })
    }
  }

  getAccessToken() {
    return localStorage.getItem('access_token')
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token')
    return authToken !== null ? true : false
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['login'])
    }
  }

  editUser(id): Observable<any> {
    this.isEditRoute = true
    return this.httpClient
      .get(`${this.API_URL}/edit/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  updateUser(id, user): Observable<any> {
    console.log(user)
    return this.httpClient
      .put(`${this.API_URL}/update/${id}`, user, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  getListedUsers(): Observable<any> {
    return this.httpClient
      .get(`${this.API_URL}/listed_users`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  deleteUser(id): Observable<any> {
    return this.httpClient
      .delete(`${this.API_URL}/delete_user/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  handleError(error: HttpErrorResponse) {
    let msg = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(msg)
  }

  getColumns(): string[] {
    return ['email', 'first_name', 'last_name']
  }

  //

  getUserProfile(id): Observable<any> {
    console.log('hy')
    return this.httpClient
      .get(`${this.API_URL}/user/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  updateUserProfile(id, user): Observable<any> {
    console.log(user)
    return this.httpClient
      .patch(`${this.API_URL}/user/${id}`, user, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }
}
