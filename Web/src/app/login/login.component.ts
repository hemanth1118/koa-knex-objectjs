import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submitted = false
  loginFailed: boolean
  EMAIL_PATTERN = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$';
  private userExists: boolean = false
  public userError: any

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      // tslint:disable-next-line
      email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]),
      password: new FormControl('', Validators.required),
    })
  }

  get loginFormControl() {
    return this.loginForm.controls
  }

  get email() {
    return this.loginForm.get('email') as FormControl
  }


  loginUser() {
    if (this.loginForm.valid) {
      // Working on your validated form data
    } else {
      this.markAllFormFieldsAsTouched(this.loginForm);
    }
    this.submitted = true
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res)
      if (res.message) {
        this.userExists = true
        this.userError = res.message
        console.log(res.message)
      } else {
        if (res.user.role == 'Admin') {
          localStorage.setItem('access_token', res.token)
          this.router.navigate(['dashboard'])
        } else {
          window.alert('You have no permission to Access this route')
          this.router.navigate(['login'])
        }
      }
    }, err => {
      console.log(err)
      this.email.setErrors({ invalid: true })
      this.loginFailed = true; // This displays the error message, I don't really like this, but that's another issue.
      // this.loginForm.controls.email = true;
      // this.loginForm.controls.password.invalid = true;
      const validationErrors = err;
      Object.keys(validationErrors).forEach(prop => {
        const formControl = this.loginForm.get(prop);
        if (formControl) {
          formControl.setErrors({
            serverError: validationErrors[prop]
          });
        }
      });
    })
  }

  markAllFormFieldsAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(
      (control) => {
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup || control instanceof FormArray) {
          this.markAllFormFieldsAsTouched(control);
        }
      });
  }
}
