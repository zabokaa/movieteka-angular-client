import { Component, OnInit } from '@angular/core';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  // transferred from app.comp.ts
  constructor (public dialog: MatDialog) {}
  ngOnInit(): void {
  }
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
