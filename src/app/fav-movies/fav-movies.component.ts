import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-fav-movies',
  templateUrl: './fav-movies.component.html',
  styleUrls: ['./fav-movies.component.scss']
})
export class FavMoviesComponent {
  favMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
  ) {}

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((user: any) => {
      this.user = user;
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.favMovies = movies.filter((m: any) => user.FavMovies.includes(m._id))
      });
    });
  }
  ngOnInit(): void {
    this.getFavMovies();
    console.log(this.favMovies)
  }
}
isFavorite(id: string): boolean {
  return this.user.FavoriteMovies.includes(id);
}

/**
 * Adds movie to user's favorite movies list using the API call fetchApiData.addFavMovie()
 * @function addToFavorites
 * @param id of movie, type: string
*/
addFav(id: string): void {
  this.fetchApiData.addFavMovie(id).subscribe((result) => {
    this.snackBar.open('Movie added to favorites', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}

/**
  * Removes movie from user's favorite movies list using the API call fetchApiData.deleteFavMovie()
  * @function removeFromFavorites
  * @param id of movie, type: string
*/
removeFav(id: string): void {
  console.log(id);
  this.fetchApiData.deleteFavMovie(id).subscribe((result) => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}

