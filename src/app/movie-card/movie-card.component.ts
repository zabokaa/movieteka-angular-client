import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';
import { Router } from '@angular/router';

// For displaying notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * Component representing the movie card used to display movie information.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []; // movies array here

  constructor(
    public fetchApiData: fetchAPIdataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies(); // call the getMovies func with '()'
  }

  /**
   * Get all movies from the API and store them in the 'movies' array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Open genre info
   * @param name The name of the genre.
   * @param description The description of the genre.
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        name: name,
        description: description,
      },
      width: '400px',
    });
  }
/**
   * Open director info
   * @param name  name of the director.
   * @param birthyear birth year of the director.
   * @param gender gender of the director.
   * @param bio biography of the director.
   */
  openDirector(
    name: string,
    birthyear: string,
    gender: string,
    bio: string
  ): void {
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
  /**
   * Open  movie description
   * @param title The title of the movie.
   * @param description The description of the movie.
   */
  openDescription(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: {
        title: title,
        description: description,
      },
      width: '400px',
    });
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
   * Add a movie to the user's favorite list.
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
   * Delete a movie from the user's favorite list.
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
        // only splice array when item is found
        user.favMovies.splice(index, 1); // 2nd parameter means remove one item only
      }
      localStorage.setItem('user', JSON.stringify(user));
      // test if working  --> yes
      console.log('Favorite Movies:', user.favMovies);
    });
  }

  /**
  * Add or remove the movie from the user's favorite list based on its current state.
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




