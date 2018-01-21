import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../security/authorization.service';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.less']
})
export class RestrictedComponent implements OnInit {

  constructor(private router:Router, authorizationService:AuthorizationService) { 
    if (authorizationService.isAuthenticated() == false) {
      router.navigate(['']);
    }
  }

  ngOnInit() {
  }

}
