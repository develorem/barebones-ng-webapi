import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from './authorization.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
    constructor(private authorizationService:AuthorizationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authorizationService.isAuthenticated()) {            
            var token = this.authorizationService.authorizationDetails.token;
            request = request.clone({
            setHeaders: {
                Authorization: `Bearer ` + token
            }
        });        
    }
    return next.handle(request);
  }
}