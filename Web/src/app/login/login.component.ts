import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submitted = false

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      // tslint:disable-next-line
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }

  get loginFormControl() {
    return this.loginForm.controls
  }

  loginUser() {
    this.submitted = true
    this.authService.login(this.loginForm.value)
  }
}
