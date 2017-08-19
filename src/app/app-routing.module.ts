import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LevelComponent } from './level/level.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
    {path:'', redirectTo: '/landing', pathMatch: 'full'},
    {path: 'landing', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'level/:id', component: LevelComponent},
    {path: 'leaderboard', component: LeaderboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'info', component: InfoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule{}