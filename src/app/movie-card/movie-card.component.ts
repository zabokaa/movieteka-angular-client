import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';
import { Router } from '@angular/router';

// For displaying notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

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

  openDescription(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: {
        title: title,
        description: description,
      },
      width: '400px',
    });
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




