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
export class UserProfileComponent implements OnInit{
  user: any = {};
  initialInput: any = {};
  favorites: any = [];

  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
 
  // update user data
  updatedUser = {
    username: '',
    password: '',
    email: '',
    bday: '',
  };

ngOnInit(): void {    //problem: ngOnit was outside of the class def
  this.getOneUser();
}

// Fetch user data via API
getOneUser(): void {
  this.fetchApiData.getOneUser().subscribe((resp: any) => {
    this.user = resp;
    this.updatedUser.username = this.user.username;
    this.updatedUser.email = this.user.email;
    this.updatedUser.bday = this.user.bday;
    this.favorites = this.user.FavMovies;
    return this.user;
  });
}

// Update user data, such as username, password, email, or birthday
editUser(): void {
  this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
    console.log(result);
    if (this.user && (this.user.username !== result.username || this.user.password !== result.password)) {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open(
        'Credentials updated! Please login using your new credentials.',
        'OK',
        {
          duration: 2000,
        }
      );
    }
    else {
      this.snackBar.open(
        'user info have been updated!',
        'OK',
        {
          duration: 2000,
        }
      );
    }
  });
}

// Delete user data for the user that is logged in
deleteUser(): void {
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

// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }

// function getOneUser() {
//   throw new Error('Function not implemented.');
// }

// function editUser() {
//   throw new Error('Function not implemented.');
// }

// function deleteUser() {
//   throw new Error('Function not implemented.');
// }