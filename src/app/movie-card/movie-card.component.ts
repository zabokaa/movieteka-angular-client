import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  movies: any[] = [];                     // movies array here
  
  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialog: MatDialog
    ) { }

ngOnInit(): void {
  this.getMovies();
}

// show all movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
// open info genre
 openGenre(movies: any): void {
  this.dialog.open(GenreComponent, {
    data: {
      name: movies.genre.name,
      description: movies.genre.description,
    },
    width: '400px',
  }),
}

