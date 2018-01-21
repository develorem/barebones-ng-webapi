import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../security/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  error:string;

  constructor(public authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  attemptLogin() {
    var loginPromise = this.authenticationService.login(this.username, this.password);
    loginPromise.then(success => {      
      this.router.navigate(['restricted']);
    },
    failure => {      
      this.error = failure.error.error_description;
    });    
  }

}
