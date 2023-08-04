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
  favorites: any = [];
   // update user data
   @Input() updatedUser = {
    username: '',
    password: '',
    email: '',
    bday: '',
  };

  constructor(
    public fetchApiData: fetchAPIdataService,
    //public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

ngOnInit(): void {    //problem: ngOnit was outside of the class def
  this.getUserData();
}

// Fetch user data via API  .. ahh, oc 2 different funcs can not have the exact same naming
getUserData(): void {
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

// Check if the movie is in the user's favorite list
isFavorite(movie: any): boolean {
  return this.fetchApiData.isFavMovie(movie._id);
}

// Add favorite movie
addFavorite(movieId: string): void {
  this.fetchApiData.addFavMovie(movieId).subscribe((Response: any) => {
    this.snackBar.open('added to favorites', 'OK', {
      duration: 2000,
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
  });
}

// Delete favorite movie
deleteFavorite(movieId: string): void {
  this.fetchApiData.deleteFavMovie(movieId).subscribe((result) => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const index = user.favMovies.indexOf(movieId);
    console.log(index);
    if (index > -1) {
      // only splice array when item is found
      user.favMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('user', JSON.stringify(user));
  });
}

// Add or remove the movie from the user's favorite list
toggleFavorite(movie: any): void {
  if (this.isFavorite(movie)) {
    this.deleteFavorite(movie._id);
    // Remove from favorites
  } else {
    // Add to favorites
    this.addFavorite(movie._id);
  }
}
}
