import { Component } from '@angular/core';

import { MovieCardComponent } from './movie-card/movie-card.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movieteka-angular-client';
  
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: '700px'
  //   });
  // }
}
