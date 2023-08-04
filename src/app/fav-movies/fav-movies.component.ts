import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';
import { GenreComponent } from '../genre/genre.component';


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

  ngOnInit(): void {
    this.getFavoriteMovies();
    // console.log(this.favMovies)
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavMovies().subscribe(
      (favoriteMovies: any) => {
        this.favMovies = favoriteMovies;    //
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  

// analog mivieCARD !!

isFavorite(movieId: string): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.favMovies.includes(movieId);
}

addFavorite(movieId: string): void {
  this.fetchApiData.addFavMovie(movieId).subscribe((result: any) => {
    this.snackBar.open('Movie added to favorites', 'OK', {
      duration: 2000,
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    this.getFavoriteMovies(); // Update the favorite movies list
  });
}

deleteFavorite(movieId: string): void {
  this.fetchApiData.deleteFavMovie(movieId).subscribe((result) => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const index = user.favMovies.indexOf(movieId);
    if (index > -1) {
      user.favMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.getFavoriteMovies(); // Update the favorite movies list
  });
}

toggleFavorite(movie: any): void {
  if (this.isFavorite(movie._id)) {
    this.deleteFavorite(movie._id);
  } else {
    this.addFavorite(movie._id);
  }
}

// also have to add all the other funcs for the movie details components
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
}