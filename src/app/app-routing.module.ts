import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CanActivateViaAuthGuard } from './authGaurd';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LevelComponent } from './level/level.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SignupComponent } from './signup/signup.component';
import { OurTeamComponent } from './our-team/our-team.component';


const routes: Routes = [
    {path:'', redirectTo: '/landing', pathMatch: 'full'},
    {path: 'landing', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'level/:id', component: LevelComponent, canActivate:[ CanActivateViaAuthGuard]},
    {path: 'leaderboard', component: LeaderboardComponent, canActivate:[ CanActivateViaAuthGuard]},
    {path: 'signup', component: SignupComponent},
    {path: 'team', component: OurTeamComponent, canActivate:[ CanActivateViaAuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule{}
