import { Component, OnInit } from '@angular/core';
import { fetchAPIdataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

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
    ) { }

  ngOnInit(): void { this.getMovies()}    // call the getMovies func with '()'
  
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
}
