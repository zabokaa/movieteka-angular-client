import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fetchAPIdataService} from '../fetch-api-data.service';    //func created last exc.
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit{
  @Input() userData = {username:'', password:'', email:'', bday:''}
  // initiate within the constructor:
  constructor(
    public fetchApiData: fetchAPIdataService,
    public dialogRef: MatDialogRef<UserRegistrationComponent>,    //passing the component !
    public snackBar: MatSnackBar,
     ) {}

     ngOnInit(): void {
       // ngOnInit method is called once the component has received all its inputs from user
     }

// FUNC for sending form inputs to my backend:
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      console.log(result)
      this.dialogRef.close()
      this.snackBar.open('user registration done', 'OK', {
        duration: 2000
      })
    }, (result) => {
      this.snackBar.open('user registration done', 'OK', {
        duration: 2000
      })
    })
  }

}
