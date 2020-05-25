import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router, ActivatedRoute } from '@angular/router'
import { CustomvalidationService } from '../customvalidation.service'
import { User } from '../user'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup
  submitted = false
  users = []
  id = []

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private customValidator: CustomvalidationService,
  ) {}

  ngOnInit() {
    this.userProfileForm = this.fb.group({
      first_name: ['', Validators.required],
      date_of_birth: [''],
      sex: [''],
      last_name: ['', [Validators.required]],
      address: this.fb.group({
        address_type: [''],
        city: [''],
        pincode: [''],
        country: [''],
        house_no: [''],
        address1: [''],
        address2: [''],
      }),
      // date_of_birth: ['']
    })
    this.route.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id')
      this.id.push(id)
      this.authService
        .getUserProfile(id)
        .subscribe((user) => this.patchUserDetails(user))
    })
  }

  get userProfileFormControl() {
    return this.userProfileForm.controls
  }

  patchUserDetails(user) {
    console.log(user)
    this.userProfileForm.patchValue({
      first_name: user.data.first_name,
      last_name: user.data.last_name,
      date_of_birth: user.data.date_of_birth,
      sex: user.data.sex,
    })
  }

  updateUserProfile() {
    this.authService
      .updateUserProfile(this.id, this.userProfileForm.value)
      .subscribe((user) => {
        this.patchUserDetails(user)
      })
  }
}
