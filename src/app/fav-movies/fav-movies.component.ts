import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-fav-movies',
  templateUrl: './fav-movies.component.html',
  styleUrls: ['./fav-movies.component.scss']
})
export class FavMoviesComponent {
  favMovies: any[] = [],
  user: any = {},

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
isFavMovie(movieId: string): boolean {
  return this.user.FavoriteMovies.includes(movieId);
}

//adding movie to fav moviese array addFavMovie()

addFavMovie(movieId: string): void {
  this.fetchApiData.addFavMovie(movieId).subscribe((result) => {
    this.snackBar.open('Movie added to favorites', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}

// Removes movie from fav movies list using fetchApiData.deleteFavMovie

deleteFavMovie(movieId: string): void {
  console.log(movieId);
  this.fetchApiData.deleteFavMovie(movieId).subscribe((result) => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}

