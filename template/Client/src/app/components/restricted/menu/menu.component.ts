import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../security/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit() {  }

  logout() {
    this.authenticationService.logout().then(result => {
      this.router.navigate(['']);
    });
    
  }
}
