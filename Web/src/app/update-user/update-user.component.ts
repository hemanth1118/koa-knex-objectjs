import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router, ActivatedRoute } from '@angular/router'
import { CustomvalidationService } from '../customvalidation.service'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup
  submitted = false
  id = []

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', [Validators.required]],
    })

    this.route.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id')
      this.id.push(id)
      this.authService.editUser(id).subscribe((user) => this.editUser(user))
    })
  }

  get userFormControl() {
    return this.userForm.controls
  }

  editUser(user) {
    console.log(user)
    this.userForm.patchValue({
      first_name: user.user.first_name,
      last_name: user.user.last_name,
      email: user.user.email,
    })
  }
  updateUser() {
  if(this.userForm.valid){
    console.log(this.userForm.value)
      this.authService.updateUser(this.id,this.userForm.value).subscribe((res) => {
        console.log(this.userForm.value)
        if (res) {
          console.log('reset form')
          this.submitted = true
          if (this.userForm.valid) {
            alert(
              'Form Submitted succesfully!!!\n Check the values in browser console.',
            )
            console.table(this.userForm.value)
          }
          this.router.navigate(['listed_users'])
        }
      })
    }
  }
}
