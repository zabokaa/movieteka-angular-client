import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  valueForm = new FormGroup({
    input: new FormControl(),            // declaring the form fields, separated by ","
    username: new FormControl()
  });
  title = 'movieteka-angular-client';
  
  onSubmit() {
    console.log(this.valueForm.value);
    }
}
