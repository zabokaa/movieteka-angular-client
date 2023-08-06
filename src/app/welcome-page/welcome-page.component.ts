import { Component, OnInit } from '@angular/core';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component representing the welcome page of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Constructor of the WelcomePageComponent.
   * @param dialog The MatDialog service used to open dialogs.
   */
  constructor (public dialog: MatDialog) {}
  ngOnInit(): void {
  }
  /**
   * Opens the user registration dialog.
   * The dialog displays the UserRegistrationComponent.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationComponent, {
      width: '320px'
    });
  };
  /**
   * Opens the user login dialog.
   * The dialog displays the UserLoginComponent.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      width: '320px'
    });
  }
}
