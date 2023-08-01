import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-fav-movies',
  templateUrl: './fav-movies.component.html',
  styleUrls: ['./fav-movies.component.scss']
})
export class FavMoviesComponent implements OnInit {
  favMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  getFavMovies(): void {
    this.fetchApiData.getOneUser().subscribe((user: any) => {
      this.user = user;
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.favMovies = movies.filter((m: any) => user.FavMovies.includes(m._id))
      });
    });
  }
  ngOnInit(): void {
    this.getFavMovies();
    // console.log(this.favMovies)
  }

// first check if movie is in fav list 
isFavMovie(id: string): boolean {
  return this.user.FavMovies.includes(id);
}
//adding movie to fav moviese array addFavMovie()

addFavMovie(id: string): void {  //why can not find name 'addFavMovie' ??
  this.fetchApiData.addFavMovie(id).subscribe((result: any) => {  //specified type of result
    this.snackBar.open('Movie added to favorites', 'OK', {
      duration: 2000,
    });
    this.getFavMovies();      //calling to update list ?
  });
}

// Removes movie from fav movies list using fetchApiData.deleteFavMovie

deleteFavMovie(id: string): void {
  this.fetchApiData.deleteFavMovie(id).subscribe((result: any) => {     //can not find 'movieId' but neihter 'movies._id/
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });
    this.getFavMovies();
  });
}
}