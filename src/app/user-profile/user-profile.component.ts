import { Component, Input, OnInit } from '@angular/core';
import { fetchAPIdataService} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component representing the user profile page.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  favorites: any = [];   //that is the array of fav movies, also use in favMovieComp
   /**
   * Input property to store the updated user data.
   */
   @Input() updatedUser = {
    username: '',
    password: '',
    email: '',
    bday: '',
  };

  constructor(
    public fetchApiData: fetchAPIdataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

ngOnInit(): void {    
  this.getUserData();
}

/**
   * Fetch user data and favorite movies via API getOneUser().
   */
getUserData(): void {                             // no need for subscribe !!
  this.user =  this.fetchApiData.getOneUser();
  this.updatedUser.username = this.user.username;
  this.updatedUser.email = this.user.email;
  this.updatedUser.bday = this.user.bday;
  
  this.fetchApiData.getAllMovies().subscribe((response: any) => {
    this.favorites = response.filter((m: {_id:any}) => this.user.favMovies.indexOf(m._id) >= 0)
    // console.log(this.favorites)     
  })
}

/**
* Update user data, such as username, password, email, or birthday via API editUser().
*/
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

/**
   * Delete user data for the user that is logged in via API deleteUser().
   */
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
/**
   * Check if the movie is in the user's favorite list.
   * @param movie The movie object to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
isFavorite(movie: any): boolean {
  return this.fetchApiData.isFavMovie(movie._id);
}

/**
   * Add a movie to the user's favorite list via API call to addFavMovie().
   * @param movieId The ID of the movie to add to favorites.
   */
addFavorite(movieId: string): void {
  this.fetchApiData.addFavMovie(movieId).subscribe((Response: any) => {
    this.snackBar.open('added to favorites', 'OK', {
      duration: 2000,
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
         // test if working --> yes
         console.log('Favorite Movies:', user.favMovies);
  });
}

/**
   * Delete a movie from the user's favorite list via API call to deleteFavMovie().
   * @param movieId The ID of the movie to remove from favorites.
   */
deleteFavorite(movieId: string): void {
  this.fetchApiData.deleteFavMovie(movieId).subscribe((result) => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const index = user.favMovies.indexOf(movieId);
    console.log(index);
    if (index > -1) {
      user.favMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('user', JSON.stringify(user));
    // test if working  --> yes
    console.log('Favorite Movies:', user.favMovies);
  });
}

/**
   * Add or remove the movie from the user's favorite list
   * @param movie The movie object to toggle in favorites.
   */
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
