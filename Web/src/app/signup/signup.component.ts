import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router, ActivatedRoute } from '@angular/router'
import { CustomvalidationService } from '../customvalidation.service'
import { User } from '../user'
import { debounceTime, tap } from 'rxjs/operators'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isEditRoute: boolean = false
  signupForm: FormGroup
  submitted = false
  user: User
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private customValidator: CustomvalidationService,
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
        role: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword',
        ),
      },
    )
  }

  ngOnInit() {
    console.log(this.email.value.length)
    this.checkEmail()
  }

  get signUpFormControl() {
    return this.signupForm.controls
  }

  get email() {
    return this.signupForm.get('email') as FormControl
  }

  checkEmail() {
    console.log('enterd')
    this.email.valueChanges.pipe(
      debounceTime(500),
      tap(email => {
        if (email !== "" && !this.email.invalid) {
          this.email.markAsPending();
        } else {
          this.email.setErrors({ invalid: true })
        }
      })
    ).subscribe(email => {
      this.authService.getUserByName(email).subscribe((user) => {
        console.log(user)
        console.log(user.user.length)
        if (user.user.length > 0) {
          this.email.markAsPending({ onlySelf: false })
          this.email.setErrors({ notUnique: true })
          console.log(user)
        } else if (!user) {
          console.log('else block')
          this.email.markAsPending({ onlySelf: false })
          this.email.setErrors(null)
        }
      })
    })
  }

  signupUser() {
    console.log('signup user initiated')
    console.log(this.signupForm.value)
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      if (res) {
        console.log('reset form')
        this.submitted = true
        if (this.signupForm.valid) {
          alert(
            'Form Submitted succesfully!!!\n Check the values in browser console.',
          )
          console.table(this.signupForm.value)
        }
        this.signupForm.reset()
        this.router.navigate(['login'])
      }
    }, err => {
      console.log(err)
      const validationErrors = err;

      Object.keys(validationErrors).forEach(prop => {
        const formControl = this.signupForm.get(prop);
        if (formControl) {
          formControl.setErrors({
            serverError: validationErrors[prop]
          });
        }
      });
    }
    )
  }
}
