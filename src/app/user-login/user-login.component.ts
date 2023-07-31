import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fetchAPIdataService} from '../fetch-api-data.service';    //func created last exc.
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Input() userData = {username:'', password:''}
  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialogRef: MatDialogRef<UserLoginComponent>,  
    public snackBar: MatSnackBar,
    public router: Router,
     ) {}

     ngOnInit(): void {
     }
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe({
    next: (result) => {
      console.log(result);
      // send to local storage
      localStorage.setItem('user', result.user.username);
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // Close the modal on success
      this.snackBar.open(`welcome back ${this.userData.username}`, 'OK', { duration: 2000 });
      this.router.navigate(['movies']);
    },
    error: (error) => {
      console.log(error);
      this.snackBar.open(error, 'OK', { duration: 2000 })
    }
  }) 
}
}
