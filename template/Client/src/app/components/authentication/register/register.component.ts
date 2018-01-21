import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../security/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  username:string;
  password:string;
  error:string;

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  attemptRegister() {
    var registerObservable = this.authenticationService.register(this.username, this.password);
    registerObservable.then(data => {
      
        // Success. Let's try logging in automatically.
        var loginPromise = this.authenticationService.login(this.username, this.password);
        loginPromise.then(success => {      
          this.router.navigate(['restricted']);
        },
        failure => {      
          this.error = failure.error.error_description;
        }); 
           
      },
      err => {

        if (err.error.ModelState) {
          var errors = new Array<string>();
          var keys = Object.keys(err.error.ModelState);
          keys.forEach((key,i) => {
            for (var index = 0; index < err.error.ModelState[key].length; index++) {
              errors.push(err.error.ModelState[key][index])
            }
          });

          this.error = errors.join(' - ');
        }        
      }
    )
  }

}
