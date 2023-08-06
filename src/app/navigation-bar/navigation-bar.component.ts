import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component representing the navigation bar used to navigate through the application.
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  /**
   * Navigate to the movies page.
   * This method is triggered when the user clicks on the 'Movies' link.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigate to the user profile page.
   * This method is triggered when the user clicks on the 'Profile' link.
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logout the user by navigating to the welcome page and clearing the local storage.
   * This method is triggered when the user clicks on the 'Logout' link.
   */
  toLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
