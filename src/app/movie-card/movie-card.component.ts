import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];                     // movies array here
  
  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void { 
    this.getMovies()  // call the getMovies func with '()'
    this.getFavMovies()
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

// fav movies icon + updating
getFavMovies(): void {
  this.fetchApiData.getOneUser().subscribe((user: any) => {
    this.user = user;
    this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      this.favMovies = movies.filter((m: any) => user.FavMovies.includes(m._id))
    });
  });
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
