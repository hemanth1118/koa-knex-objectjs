import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router, ActivatedRoute } from '@angular/router'
import { CustomvalidationService } from '../customvalidation.service'
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  taskForm: FormGroup
  submitted = false
  id = []

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      difficulty: ['', [Validators.required]],
      status: ['', [Validators.required]],
      estimation: ['', [Validators.required]],
    })

    this.route.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id')
      this.id.push(id)
      this.authService.getTaskById(id).subscribe((user) => {
        console.log(user)
        this.patchValues(user)
      })
    })
  }

  get userFormControl() {
    return this.taskForm.controls
  }

  patchValues(user) {
    let latest_date = this.datepipe.transform(
      user.data.estimation,
      'MM/dd/yyyy',
    )
    console.log(latest_date)
    this.taskForm.patchValue({
      task: user.data.task,
      difficulty: user.data.difficulty,
      status: user.data.status,
      estimation: latest_date
    })
  }
  updateTask() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value)
      this.authService
        .updateTask(this.id, this.taskForm.value)
        .subscribe((res) => {
          console.log(this.taskForm.value)
          if (res) {
            console.log('reset form')
            if (this.taskForm.valid) {
              alert(
                'Form Submitted succesfully!!!\n Check the values in browser console.',
              )
              console.table(this.taskForm.value)
            }
            const id = this.authService.id
            console.log(id)
            this.router.navigate([`task/${id}`])
          }
        })
    }
  }

  goBackToTasks() {
    const id = this.authService.id
    this.router.navigate([`task/${id}`])
  }
}
