import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';
// want to open profile via toolbar
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';
import { FavMoviesComponent } from '../fav-movies/fav-movies.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];                     // movies array here

  user: any; // Added user variable to store user data


  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialog: MatDialog,
    public router: Router,
    ) { }

  ngOnInit(): void { 
    this.getMovies()   // call the getMovies func with '()'
    this.getUserData(); // Call the function to get userdata
  }    
  
// show all movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
}
// open info genre
 openGenre(name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      name: name,
      description: description,
    },
    width: '400px',
  });
}

openDirector(name: string, birthyear: string, gender: string, bio: string): void {
  this.dialog.open(DirectorComponent, {
    data: {
      name: name,
      birthyear: birthyear,
      gender: gender,
      bio: bio,
    },
    width: '400px',
  });
}

openDescription(title: string, description: string): void {
  this.dialog.open(DescriptionComponent, {
    data: {
      title: title,
      description: description,
    },
    width: '400px',
  });
}
// }

// how to add the favMovies since it should not be displayed in a dialog window
// duplicating from favMovies componant . . but should be cleaner way . do I really need the sep. fav-movies compo ?? isnt it suff. to include in user-profile ?
// Fetch user data via API
getUserData(): void {
  this.fetchApiData.getOneUser().subscribe((resp: any) => {
    this.user = resp;
  });
}

// Check if the movie is in the user's favorite list
isFavorite(movie: any): boolean {
  if (!this.user || !this.user.FavMovies) return false;
  return this.user.FavMovies.includes(movie._id);
}

// Add or remove the movie from the user's favorite list
toggleFavorite(movie: any): void {
  const token = localStorage.getItem('token');
  const movieId = movie._id;
  if (this.isFavorite(movie)) {
    // Remove from favorites
    this.fetchApiData.deleteFavMovie(movieId).subscribe((result) => {
      console.log(result);
      // Update user data after successful removal
      this.getUserData();
    });
  } else {
    // Add to favorites
    this.fetchApiData.addFavMovie(movieId).subscribe((result) => {
      console.log(result);
      // Update user data after successful addition
      this.getUserData();
    });
  }
}
}




