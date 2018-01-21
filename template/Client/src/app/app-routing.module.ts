import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RestrictedComponent } from './components/restricted/restricted.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
