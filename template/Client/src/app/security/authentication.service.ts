import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgForage } from '@ngforage/ngforage-ng5';
import { AuthorizationService } from './authorization.service';
import { AppSettingsService } from '../services/app-settings.service';

export class UserRegistration {
  userName:string;
  email:string;
  password:string;
  confirmPassword:string;
}

@Injectable()
export class AuthenticationService {

  // This class helps with login, logout and registration by calling the server account management api

  constructor(
    private http: HttpClient, 
    private appSettingsService:AppSettingsService, 
    private authorizationService:AuthorizationService) { }

  login(username:string, password:string) {        
    var path = this.appSettingsService.baseTokenPath;
    // The Token api requires special headers, and the request body must be as defined below.
    var body = "grant_type=password&username=" + username + "&password=" + password;

    return this.http
      .post(path, body, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}})
      .toPromise() 
      .then(successValue => {                    
          // We received a response from our API call, store the details and push them into local storage
          this.authorizationService.authorizationDetails.username = username;
          this.authorizationService.authorizationDetails.token = successValue["access_token"];
          this.authorizationService.authorizationDetails.tokenExpires = new Date(successValue[".expires"]);
          this.authorizationService.authorizationDetails.tokenIssued = new Date(successValue[".issued"]);
          this.authorizationService.persistAuthorization();

          return successValue;
      });
  }

  register(username:string, password:string) {
    // TODO - Add other items such as first/last
    var path = this.appSettingsService.baseApiPath + 'Account/Register';
    var user = new UserRegistration();
    user.userName = username;
    user.password = password;
    user.email = username;
    user.confirmPassword = password;

    return this.http.post(path, user).toPromise();    
  }

  logout() {
    if (this.authorizationService.isAuthenticated()) {
      this.authorizationService.clearAuthorization();      
    }

    var path = this.appSettingsService.baseApiPath + 'Account/Logout';
    return this.http.post(path, null).toPromise();
  }
}
