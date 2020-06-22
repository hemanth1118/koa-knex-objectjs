import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { User } from '../user'
import { DatePipe } from '@angular/common'
// import { AngularFontAwesomeModule } from 'angular-font-awesome'

@Component({
  selector: 'app-user-profile',
  templateUrl: './listed-users.component.html',
  styleUrls: ['./listed-users.component.css'],
})
export class ListedUsersComponent implements OnInit {
  currentUser: object = {}
  users = []
  current: any
  isProfileComplete = false
  dateInCorrectFormate: string
  userAddress = []
  columns: string[]
  panelExpanded = true
  confirmDelete = false
  loginUser = []
  loginUser1 = []


  constructor(
    public datepipe: DatePipe,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe((res) => {
    //   this.currentUser = res.msg;
    // });
    this.authService.getAllUsers().subscribe((res) => {
      this.users = res.user
      console.log(this.users)
    })
  }

  ngOnInit() {
    this.columns = this.authService.getColumns()

  }
  logout() {
    this.authService.logout()
  }

  updateUser(id) {
    console.log(this.users)
    id = this.users[id].id
    this.router.navigate(['/edit', id])
    this.authService.editUser(id)
  }

  deleteUser(id) {
    id = this.users[id].id
    this.authService.deleteUser(id).subscribe(() => {
      console.log(`User with Id = ${id} deleted`)
      this.router.navigate(['/listed_users'])
      this.authService.getListedUsers().subscribe((res) => {
        this.users = res.user
      })
    })
  }

  userProfile(id) {
    id = this.users[id].id
    this.router.navigate(['/user_profile', id])
    this.authService.getUserProfile(id)
  }

  toggleAccordian(event, i) {
    var element = event.target
    element.classList.toggle('active')
    if (this.users[i]) {
      console.log(this.users[i])
      this.panelExpanded = false
    } else {
      this.panelExpanded = true
    }
    console.log(event, i)
  }

  isComplete(i) {
    this.dateInCorrectFormate = this.datepipe.transform(
      this.users[i].date_of_birth,
      'MM/dd/yyyy',
    )
    console.log(this.dateInCorrectFormate)
    if (this.users[i].first_name != null) {
      this.isProfileComplete = true
    } else {
      this.isProfileComplete = false
    }
  }
}
