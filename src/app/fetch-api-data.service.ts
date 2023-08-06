import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movieteka-zabokaa.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class fetchAPIdataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the API call for the user registration endpoint
  /**
   * Register a new user.
   * @param userDetails An object containing user registration details.
   * @returns An Observable containing the response from the API.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // API for user login
  /**
   * Log in an existing user.
   * @param userDetails An object containing user login details.
   * @returns An Observable containing the response from the API.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // API for get all movies
  /**
   * Get all movies from the API.
   * @returns An Observable containing the response from the API.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // API get 1 movie
  /**
   * Get a single movie from the API based on its title.
   * @param title The title of the movie to retrieve.
   * @returns An Observable containing the response from the API.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API get director
  /**
   * Get a single director from the API based on the director's name.
   * @param directorName The name of the director to retrieve.
   * @returns An Observable containing the response from the API.
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // API for get genre
  /**
   * Get a single genre from the API based on the genre's name.
   * @param genreName The name of the genre to retrieve.
   * @returns An Observable containing the response from the API.
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API get user
  /**
   * Get the user data for the currently logged-in user from local storage.
   * @returns The user object from local storage.
   */
  getOneUser(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  // API get favMovies
  /**
   * Get the favorite movies for the currently logged-in user from the API.
   * @returns An Observable containing the response from the API.
   */
  getFavMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + user.username + '/favMovies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavMovies),
        catchError(this.handleError)
      );
  }

  // API add movie to favs
  /**
   * Add a movie to the favorites list for the currently logged-in user.
   * @param movieId The ID of the movie to add to favorites.
   * @returns An Observable containing the response from the API.
   */
  addFavMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .post(
        apiUrl + 'users/' + user.username + '/favMovies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Check if a movie is favorite
  /**
   * Check if a movie is in the favorites list for the currently logged-in user.
   * @param movieId The ID of the movie to check.
   * @returns True if the movie is a favorite, otherwise false.
   */
  isFavMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favMovies.indexOf(movieId) >= 0;
  }

  // API edit user
  /**
   * Edit the user data for the currently logged-in user.
   * @param updatedUser An object containing the updated user data.
   * @returns An Observable containing the response from the API.
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + user.username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // API del user
  /**
   * Delete the user data for logged-in user.
   * @returns An Observable containing the response from the API.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + user._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // API del movie from favs array
  /**
   * Delete a movie from the favorites list for logged-in user.
   * @param movieId The ID of the movie to delete from favorites.
   * @returns An Observable containing the response from the API.
   */
  deleteFavMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users/' + user.username + '/favMovies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  // handle Error on end
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.') // fixed bug !
    );
  }
}