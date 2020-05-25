import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { User } from '../user'

@Component({
  selector: 'app-user-profile',
  templateUrl: './listed-users.component.html',
  styleUrls: ['./listed-users.component.css'],
})
export class ListedUsersComponent implements OnInit {
  currentUser: object = {}
  users = [] 
  columns: string[]
  // @Input() user: User

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe((res) => {
    //   this.currentUser = res.msg;
    // });
    this.authService.getListedUsers().subscribe((res) => {
      this.users = res.user
      console.log(res)
      this.users.push(res.user)
      console.log(this.users)
    })
  }

  ngOnInit() {
    this.columns = this.authService.getColumns()
  }

  updateUser(id) {
    console.log(this.users)
    id = this.users[id].id
    this.router.navigate(['/edit', id])
    this.authService.editUser(id)
  }

  deleteUser(id) {
    id = this.users[id].id
    this.authService.deleteUser(id).subscribe(() =>{
      console.log(`User with Id = ${id} deleted`)
      this.router.navigate(['/listed_users'])
      this.authService.getListedUsers().subscribe((res) => {
        this.users = res.user
      })
    })
  }

  userProfile(id){
    id = this.users[id].id
    this.router.navigate(['/user_profile', id])
    this.authService.getUserProfile(id)
  }
}
