import { Component, OnInit, Input, HostListener } from '@angular/core'
// import { MatMenuModule } from '@angular/material/menu';
// import { MatMenuButton } from '@angular/material/button';
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
import { Observable } from 'rxjs'
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  getAllTasks = []
  taskForm: FormGroup
  @Input() id = []
  dateInCorrectFormate: string
  isEditTask = false
  Tasks = []
  estimation = []
  displayOverDue = false

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private customValidator: CustomvalidationService,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      tasks: this.fb.array([this.taskFormGroup()]),
    })
    this.route.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id')
      this.id.push(id)
      this.authService
        .getUserProfile(id)
        .subscribe((user_tasks) => {
          console.log(user_tasks)
          this.Tasks = user_tasks.data.tasks
          for (var i = 0; i < this.Tasks.length; i++) {
            this.estimation.push(this.datepipe.transform(
              user_tasks.data.tasks[i].estimation,
              'MM/dd/yyyy',
            ))
          }
          console.log(this.estimation)
        })
    })
  }


  taskFormGroup(): FormGroup {
    return this.fb.group({
      task: [],
      difficulty: [],
      status: [],
      estimation: []
    })
  }

  addTaskButtonClick(): void {
    (<FormArray>this.taskForm.get('tasks')).push(this.taskFormGroup())
  }

  OnClickDeleteButton(id) {
    console.log(this.Tasks[id].id)
    this.authService.deleteTask(this.Tasks[id].id).subscribe(() => {
      console.log(`task deleted`)
      if (this.taskForm.valid) {
        alert(
          'Form Submitted succesfully!!!\n Check the values in browser console.',
        )
        console.table(this.taskForm.value)
      }
      this.taskForm.reset()
      this.Tasks.splice(id, 1)
      // this.router.navigate(['task ' + `/${this.id}`])
    })
  }

  createTaskButtonOnClick(id) {
    console.log(this.taskForm.value.tasks[id])
    this.authService
      .createTask(this.taskForm.value.tasks[id], this.id)
      .subscribe((res) => {
        if (res) {
          this.Tasks.splice(id, 0, this.taskForm.value.tasks[id])
          this.authService
            .getUserProfile(this.id)
            .subscribe((user_tasks) => {
              console.log(user_tasks)
              this.Tasks = user_tasks.data.tasks
              for (var i = 0; i < this.Tasks.length; i++) {
                this.estimation.push(this.datepipe.transform(
                  user_tasks.data.tasks[i].estimation,
                  'MM/dd/yyyy',
                ))
              }
            })
          console.log('user task created')
        }
      })
  }

  onClickEdit(id) {
    console.log(this.Tasks[id].id)
    this.router.navigate(['edit_task', this.Tasks[id].id])
  }

  onClickUpdateStatus(id) {
    console.log(this.Tasks[id].id)
    this.authService.updateStatus(this.Tasks[id].id).subscribe((res) => {
      this.authService
        .getUserProfile(this.id)
        .subscribe((user_tasks) => {
          console.log(user_tasks)
          this.Tasks = user_tasks.data.tasks
          for (var i = 0; i < this.Tasks.length; i++) {
            this.estimation.push(this.datepipe.transform(
              user_tasks.data.tasks[i].estimation,
              'MM/dd/yyyy',
            ))
          }
        })
      console.log(res)
    })
  }

  updateStatusAsCompleted(id) {
    this.authService.updateTaskAsCompleted(this.Tasks[id].id).subscribe((res) => {
      this.authService
        .getUserProfile(this.id)
        .subscribe((user_tasks) => {
          console.log(user_tasks)
          this.Tasks = user_tasks.data.tasks
          for (var i = 0; i < this.Tasks.length; i++) {
            this.estimation.push(this.datepipe.transform(
              user_tasks.data.tasks[i].estimation,
              'MM/dd/yyyy',
            ))
          }
        })
      console.log(res)
    })
  }

  getAllOverDueTasks() {
    this.displayOverDue = true
    this.authService.getAllOverDueTasks().subscribe((res) => {
      this.Tasks = res.data
      console.log(res)
    })
  }

  onClickCancel() {
    this.route.paramMap.subscribe((parameterMap) => {
      this.authService
        .getUserProfile(this.id)
        .subscribe((user_tasks) => {
          console.log(user_tasks)
          this.Tasks = user_tasks.data.tasks
          for (var i = 0; i < this.Tasks.length; i++) {
            this.estimation.push(this.datepipe.transform(
              user_tasks.data.tasks[i].estimation,
              'MM/dd/yyyy',
            ))
          }
        })
    })
  }

  // patchUserTasks(user) {
  //   (this.taskForm.controls['task']).setValue(user.task)
  //   this.taskForm.setValue({
  //     task: user.task,
  //     difficulty: user.difficulty,
  //     status: user.status,
  //     estimation: user.estimation
  //   })
  // }

  // patchUserTasks(user_tasks) {
  //   this.taskForm.setControl(
  //     'tasks',
  //     this.setExistingTasks(user_tasks),
  //   )
  // }

  // setExistingTasks(u) {
  //   const tasks_formArray = new FormArray([])
  //   // user_tasks.forEach((u) => {
  //   // console.log(u)
  //   tasks_formArray.push(
  //     this.fb.group({
  //       task: u.task,
  //       difficulty: u.difficulty,
  //       pincode: u.pincode,
  //       status: u.status,
  //       estimation: u.estimation,
  //       user_id: u.user_id,
  //     })
  //   )
  //   // })
  //   // ; (<FormArray>this.taskForm.get('tasks')).push(this.taskFormGroup())
  //   console.log(tasks_formArray)
  //   return tasks_formArray.value

  // }
}
