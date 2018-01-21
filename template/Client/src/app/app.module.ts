import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {NgForageModule} from "@ngforage/ngforage-ng5";

import { RestrictedRoutingModule } from './components/restricted/restricted-routing.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { MenuComponent } from './components/restricted/menu/menu.component';
import { SummaryComponent } from './components/restricted/summary/summary.component';
import { AddbooksComponent } from './components/restricted/addbooks/addbooks.component';
import { RestrictedComponent } from './components/restricted/restricted.component';

import { AppSettingsService } from './services/app-settings.service';
import { AuthorizationService } from './security/authorization.service';
import { LibraryService } from './services/library.service';

import { TokenInterceptor } from './security/token-interceptor';
import { AuthenticationService } from './security/authentication.service';

@NgModule({
  declarations: [    
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    SummaryComponent,
    AddbooksComponent,
    RestrictedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RestrictedRoutingModule,
    AppRoutingModule,
    NgForageModule
  ],
  providers: [AppSettingsService, AuthenticationService, AuthorizationService, LibraryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
