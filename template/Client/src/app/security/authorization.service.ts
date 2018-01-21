import { Injectable } from '@angular/core';
import { NgForage } from "@ngforage/ngforage-ng5";


export class AuthorizationDetails {
    username:string;
    token:string;
    tokenIssued:Date;
    tokenExpires:Date;
}

@Injectable()
export class AuthorizationService {    
    // This service wraps calls to the user's auth details and checks validness of token expiry

    public authorizationDetails:AuthorizationDetails;
    
    constructor(private storage: NgForage) {
        this.authorizationDetails = new AuthorizationDetails();        
    }

    // Must have a token, and the expiry must be in the future.
    isAuthenticated() {
        if (this.authorizationDetails != null && 
            this.authorizationDetails.token != null && 
            this.authorizationDetails.tokenExpires > new Date()) {                
                return true;
        }
        this.clearAuthorization();
        return false;
    }
    
    // Put the current auth details into local storage. Tends to only be called after login or token renewal
    persistAuthorization() {
        return this.storage.setItem('auth', this.authorizationDetails);
    }

    // Pulls auth detail out of local storage into this service. Usually only called when the app first loads
    restoreAuthorization() {  
        return this.storage.getItem<AuthorizationDetails>('auth')
        .then(value => {
            if (value != null) {
                this.authorizationDetails = value;
            }
            return this.authorizationDetails;
        });      
    }

    // Useful if the user logs out
    clearAuthorization() {
        this.authorizationDetails.token = null;
        this.authorizationDetails.tokenExpires = null;
        this.authorizationDetails.tokenIssued = null;
        this.authorizationDetails.username = null;
        return this.storage.removeItem('auth');
    }
}