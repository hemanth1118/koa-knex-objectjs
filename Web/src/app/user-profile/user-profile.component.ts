import { Component, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms'
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
  isEnableSaveButton = false
  isEditButtonEnable = false

  constructor(
    public datepipe: DatePipe,
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private customValidator: CustomvalidationService,
  ) { }

  ngOnInit() {
    this.userProfileForm = this.fb.group({
      first_name: ['', Validators.required],
      date_of_birth: [''],
      sex: [''],
      last_name: ['', [Validators.required]],
      address: this.fb.array([this.addAddressFormGroup()])
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
    let latest_date = this.datepipe.transform(
      user.data.date_of_birth,
      'MM/dd/yyyy',
    )
    console.log(latest_date)
    console.log(user)
    this.userProfileForm.patchValue({
      first_name: user.data.first_name,
      last_name: user.data.last_name,
      date_of_birth: latest_date,
      sex: user.data.sex,
    })
    this.userProfileForm.setControl(
      'address',
      this.setExistingAddress(user.data.address),
    )
  }

  setExistingAddress(user_address): FormArray {
    const formArray = new FormArray([])
    console.log(user_address)
    user_address.forEach((u) => {
      console.log(u)
      formArray.push(
        this.fb.group({
          address_type: u.address_type,
          city: u.city,
          pincode: u.pincode,
          address1: u.address1,
          address2: u.address2,
          country: u.country,
        }),
      )
    })
      ; (<FormArray>this.userProfileForm.get('address')).push(
        this.addAddressFormGroup(),
      )
    return formArray
  }

  updateUserProfile() {
    console.log(this.userProfileForm.value)
    this.authService
      .updateUserProfile(this.id, this.userProfileForm.value)
      .subscribe((user) => {
        console.log(user)
        if (this.userProfileForm.valid) {
          alert(
            'Form Submitted succesfully!!!\n Check the values in browser console.',
          )
          console.table(this.userProfileForm.value)
        }
        this.userProfileForm.reset()
        this.router.navigate(['listed_users'])
        // this.patchUserDetails(user)
      })
  }

  taskFormGroup(): FormGroup {
    return this.fb.group({
      task: [],
      difficulty: [],
      status: [],
      estimation: [],
      user_id: [],
    })
  }

  OnClickTaskButton() {
    this.router.navigate([`task/${this.id}`])
  }

  addAddressFormGroup(): FormGroup {
    return this.fb.group({
      address_type: [],
      city: [],
      pincode: [],
      country: [],
      address1: [],
      address2: [],
    })
  }
}
