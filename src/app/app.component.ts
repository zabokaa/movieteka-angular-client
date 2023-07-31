import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movieteka-angular-client';
  // just for openiing the dialog itself
  constructor (public dialog: MatDialog) {}
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationComponent, {
      width: '320px'
    });
  };
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      width: '320px'
    });
  }

  
}
