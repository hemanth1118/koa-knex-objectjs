import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { User } from './user'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUserDetails = []
  API_URL = 'http://localhost:3000'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'access-control-allow-origin': 'http://localhost:4200',
  })
  isEditRoute: boolean = false
  id: number

  constructor(private httpClient: HttpClient, public router: Router) { }

  // signup page post method
  signup(user: User): Observable<any> {
    console.log('signup() service initiated')
    return this.httpClient
      .post(`${this.API_URL}/signup`, user)
      .pipe(catchError(this.handleError))
  }

  // getUsername() {
  //   return JSON.parse(localStorage.getItem('access_token')).email;
  // }
  // login page post method
  login(user: User): Observable<any> {
    console.log(user)
    if (user.email.length !== 0 && user.password.length !== 0) {
      return this.httpClient
        .post(`${this.API_URL}/login`, user)
        .pipe(
          map((res: Response) => {
            // console.log(res)
            // if (res.user.role == 'Admin') {
            //   localStorage.setItem('access_token', res.token)
            //   this.router.navigate(['dashboard'])
            // } else {
            //   window.alert('You have no permission to Access this route')
            //   this.router.navigate(['login'])
            // }
            return res || {}
          }),
          catchError(this.handleError),
        )
      // .subscribe((res: any) => {
      //   console.log(res)
      //   // this.loginUserDetails.push(res.user.email)
      //   // localStorage.setItem('access_token', JSON.stringify({ email: res.user.email, token: res.token }));
      //   localStorage.setItem('access_token', res.token)
      //   if (res.user.role == 'Admin') {
      //     this.router.navigate(['dashboard'])
      //   } else {
      //     window.alert('You have no permission to Access this route')
      //     this.router.navigate(['login'])
      //   }
      // })
    }
  }

  getImage(id): Observable<any> {
    return this.httpClient
      .get(`${this.API_URL}/upload/${id}`)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  getAllImages(): Observable<any> {
    return this.httpClient
      .get(`${this.API_URL}/upload`)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  uploadFile(image, id): Observable<any> {
    let uploadData = new FormData();
    uploadData.append('file', image, image.name,);
    uploadData.append('id', id)
    console.log(uploadData)
    return this.httpClient
      .post(`${this.API_URL}/upload`, uploadData)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  deleteImage(id, image): Observable<any> {
    // let deleteData = new FormData();
    // // deleteData.append('file', image, image.name,);
    // deleteData.append('id', id)
    console.log(id)
    return this.httpClient
      .delete(`${this.API_URL}/delete/${image}`)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  updateImage(image, id) {
    let uploadData = new FormData();
    uploadData.append('file', image, image.name,);
    console.log(uploadData)
    return this.httpClient
      .put(`${this.API_URL}/update_image/${id}`, uploadData)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
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

  // get userDetails for edit purpose

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

  // Update user put methode

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

  // Listed-Users get method

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

  // get all users

  getAllUsers(): Observable<any> {
    console.log('all users')
    return this.httpClient
      .get(`${this.API_URL}/user`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  // delete User for delete button specified in listed-users component

  deleteUser(id): Observable<any> {
    return this.httpClient
      .delete(`${this.API_URL}/user/${id}`, { headers: this.headers })
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
      // A client-side or network error occurred. Handle it   accordingly.
      console.error('An error occurred:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // return error
      console.error(error)
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };

  getColumns(): string[] {
    return ['email', 'first_name', 'last_name']
  }

  // get method to show the user-Details by clicking user-details button on listed-users component

  getUserProfile(id): Observable<any> {
    console.log('hy')
    this.id = id
    console.log(this.id)
    return this.httpClient
      .get(`${this.API_URL}/user/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  // Update user -->here multiple updations takes place in users and user-login and user-address tables

  updateUserProfile(id, user): Observable<any> {
    console.log(user)
    return this.httpClient
      .put(`${this.API_URL}/user/${id}`, user, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  // User-Task creation post method

  createTask(user, user_id): Observable<any> {
    console.log(user)
    return this.httpClient
      .post(
        `${this.API_URL}/task`,
        { user, user_id },
        { headers: this.headers },
      )
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  deleteTask(id): Observable<any> {
    console.log(id)
    return this.httpClient
      .delete(`${this.API_URL}/task/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  getTaskById(id): Observable<any> {
    return this.httpClient
      .get(`${this.API_URL}/task/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  updateStatus(id): Observable<any> {
    return this.httpClient
      .put(`${this.API_URL}/update_status/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  updateTask(id, user): Observable<any> {
    console.log(user)
    return this.httpClient
      .put(`${this.API_URL}/task/${id}`, user, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  updateTaskAsCompleted(id): Observable<any> {
    return this.httpClient
      .put(`${this.API_URL}/update_completed_task/${id}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  getAllOverDueTasks(): Observable<any> {
    return this.httpClient
      .get(`${this.API_URL}/overdue_tasks`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

  getUserByName(name): Observable<any> {
    return this.httpClient
      .get(`${this.API_URL}/email/${name}`, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError),
      )
  }

}