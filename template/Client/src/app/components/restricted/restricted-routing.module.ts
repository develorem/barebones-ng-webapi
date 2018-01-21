import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddbooksComponent } from './addbooks/addbooks.component';
import { SummaryComponent } from './summary/summary.component';
import { RestrictedComponent } from './restricted.component';


const restrictedRoutes: Routes = [
  { 
    path: 'restricted', 
    component: RestrictedComponent,
    children: [ 
      { path: '', component:SummaryComponent },
      { path: 'addbooks', component: AddbooksComponent }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(restrictedRoutes)],
  exports: [RouterModule]
})
export class RestrictedRoutingModule { }
