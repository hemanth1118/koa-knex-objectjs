import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { User } from '../user'
import { DatePipe } from '@angular/common'
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { HttpClient } from '@angular/common/http'
// import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './listed-users.component.html',
  styleUrls: ['./listed-users.component.css'],
})
export class ListedUsersComponent implements OnInit {

  // uploader: FileUploader = new FileUploader({ url: url })

  attachmentList: any = []
  fileToUpload: File = null;
  currentUser: object = {}
  users = []
  image = []
  current: any
  isProfileComplete = false
  dateInCorrectFormate: string
  private _searchTerm: string
  userAddress = []
  columns: string[]
  panelExpanded = true
  confirmDelete = false
  loginUser = []
  loginUser1 = []
  profile
  nameOnTopBar = false
  isProfilePicEmpty = true
  panelOpenState = false;

  selectedFile: File
  // showUpdateButton = true
  url;
  msg = "";
  imageUrls;
  ProfileStatus = 'In-complete';

  isProfileCompleted(i) {
    if (this.users[i].first_name != null && this.users[i].last_name != null) {
      return [this.users[i].first_name, this.users[i].last_name]
    } else {
      return [this.users[i].email, (this.ProfileStatus)]
    }
  }
  step;

  setStep(index: number) {
    this.step = index;
  }

  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.imageUrls = ""
    }
    this.selectedFile = files[0]
  }

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.users = this.filterUsers(value)
  }

  onUpload(i) {
    const id = this.users[i].id
    this.authService.uploadFile(this.selectedFile, id).subscribe((res) => {
      this.imgURL = null
      this.isComplete(i)
    })
    alert('photo has been uloaded successfully')
  }

  onclickDeleteImage(i) {
    const id = this.users[i].id
    const imageName = this.users[i].photo.file_name
    this.authService.deleteImage(id, imageName).subscribe(res => {
      console.log(res)
      this.isComplete(i)
    })
    alert('successfully deleted photo')
  }

  onclickUpdateImage(i) {
    const id = this.users[i].id
    this.authService.updateImage(this.selectedFile, id).subscribe((res) => {
      this.imgURL = null
      console.log(res)
      // this.imageUrls += '?random+\=' + Math.random()
      // this.imageUrls = res

      this.isComplete(i)
    })
    window.alert('successfully update image')
    // this.ngOnInit()
  }

  filterUsers(searchString: String) {
    if (this.searchTerm != "") {
      return this.users.filter(user =>
        user.email.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
    } else if (this.searchTerm == "") {
      this.ngOnInit();
    }
  }

  constructor(
    public datepipe: DatePipe,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,

  ) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe((res) => {
      this.users = res.user
      console.log(this.users)
      this.columns = this.authService.getColumns()
    })

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

  isComplete(i) {
    this.dateInCorrectFormate = this.datepipe.transform(
      this.users[i].date_of_birth,
      'MM/dd/yyyy',
    )
    this.imgURL = ""
    console.log(this.dateInCorrectFormate)
    if (this.users[i].first_name != null) {
      this.isProfileComplete = true
    } else {
      this.isProfileComplete = false
    }

    this.authService.getImage(this.users[i].id).subscribe((res) => {
      if (res == undefined) {
        this.isProfilePicEmpty = true
      }
      else if (res.message == 'no image') {
        console.log('enterd  if')
        this.isProfilePicEmpty = true
      } else if (res.imageUrl != '') {
        console.log('enterd else if')
        this.isProfilePicEmpty = false
      }
      console.log(res)
      this.imageUrls = res.imageUrl
      // console.log(this.imageUrls)
    })
  }

}
