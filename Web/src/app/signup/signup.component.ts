import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomvalidationService } from '../customvalidation.service'
import { User} from '../user'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isEditRoute:boolean = false
  signupForm: FormGroup;
submitted = false;
user: User

constructor(
  private fb: FormBuilder,
  public authService: AuthService,
  public router: Router,
  private route: ActivatedRoute,
  private customValidator: CustomvalidationService
) { }

ngOnInit() {
  this.signupForm = this.fb.group({
    first_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    last_name: ['', [Validators.required]],
    password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    confirmPassword: ['', [Validators.required]],
  },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
  );
 
 
}



get signUpFormControl() {
  return this.signupForm.controls;
}


signupUser() {
  console.log('signup user initiated');
  this.authService.signup(this.signupForm.value).subscribe((res) => {
    if (res) {
      console.log('reset form')
        this.submitted = true;
        if (this.signupForm.valid) {
          alert('Form Submitted succesfully!!!\n Check the values in browser console.');
          console.table(this.signupForm.value);
        }
      this.signupForm.reset();
      this.router.navigate(['login']);
    }
  });
}
}
