import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './security/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(router:Router, authorizationService:AuthorizationService) {
    console.log('AppComponent CTOR');

    // On app startup, we will check for a token that might still be in localstorage
    // If its valid, auto login the user.
    authorizationService.restoreAuthorization().then(authDetails => {
      if (authorizationService.isAuthenticated()) {
        router.navigate(['restricted']);
      }
      else {
        router.navigate([''])
      }
    });    
  }
}
