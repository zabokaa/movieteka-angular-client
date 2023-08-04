import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fetchAPIdataService} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  favorites: any = [];   //that is the array of fav movies
   // update user data
   @Input() updatedUser = {
    username: '',
    password: '',
    email: '',
    bday: '',
  };

  constructor(
    public fetchApiData: fetchAPIdataService,
    //public dialogRef: MatDialogRef<UserProfileComponent>, // not needed !!
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

ngOnInit(): void {    //problem: ngOnit was outside of the class def
  this.getUserData();
  // this.getFavorites();
  // console.log(this.ngOnInit);   --> oki, both funcs have been called
}

// Fetch user data via API  .. ahh, oc 2 different funcs can not have the exact same naming
getUserData(): void {                             // no need for subscribe !!
  this.user =  this.fetchApiData.getOneUser();
  this.updatedUser.username = this.user.username;
  this.updatedUser.email = this.user.email;
  this.updatedUser.bday = this.user.bday;
  this.favorites = this.user.FavMovies;
    return this.user;
}

// Update user data, such as username, password, email, or birthday
editUserData(): void {
  this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
    console.log(result);
    if (this.user && (this.user.username !== result.username || this.user.password !== result.password)) {
      localStorage.clear();
      this.router.navigate(['profile']);   //habe das hier von welcome to profile geaendert
      this.snackBar.open(
        'Your user date have been updated',
        'OK',
        {
          duration: 2000,
        }
      );
    }
  });
}

// Delete user data for the user that is logged in
deleteUserData(): void {
  if (confirm('your account will be completely deleted + all your data will be lost')) {
    this.router.navigate(['welcome']).then(() => {
      this.snackBar.open(
        'You have successfully deleted your account!',
        'OK',
        {
          duration: 2000,
        }
      );
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
      localStorage.clear();
    });
  }
}

// // getting array of favorite movies of the user
// getFavorites(): void {
//   this.fetchApiData.getFavMovies().subscribe((resp: any) => {
//     this.favorites = resp;       // here updating fav array with fetched data
//     console.log(this.favorites);  // not showing 
//   });
// }

}
