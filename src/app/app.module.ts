import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'


import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LevelComponent } from './level/level.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SignupComponent } from './signup/signup.component';
import { OurTeamComponent } from './our-team/our-team.component';


import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { MaterialModule } from './material.module';
import { FacebookModule } from 'ngx-facebook';
// import { AuthService, AppGlobals } from 'angular2-google-login';
// import { GooglesigninComponent } from './googlesignin/googlesignin.component';
import { AuthServices } from './_services/authguard.service';
import { CanActivateViaAuthGuard } from './authGaurd';
import {CountDown} from "ng2-date-countdown";
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    LevelComponent,
    LeaderboardComponent,
    SignupComponent,
    // GooglesigninComponent,
    OurTeamComponent,
    CountDown
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    ScrollToModule.forRoot(),
  ],
  providers: [AuthServices, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
