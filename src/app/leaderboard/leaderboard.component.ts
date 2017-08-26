import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Player } from '../_models/level';
import { LeaderBoard } from '../_models/leaderboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  providers: [HTTPService]
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderBoard[];
  Alias: any = {alias: ''};

  constructor(
    private http: HTTPService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPlayer()
  }
  getPlayer(){
    this.http.authGet('http://localhost:8080/player/')
      .subscribe(leaderboard => this.leaderboard = leaderboard);
  }
  Logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  getAlias(): void{
    this.http.authGet('http://localhost:8080/level/').subscribe(Alias => this.levelNavigate(Alias['alias']));
  }
  levelNavigate(alias): void{
    console.log('routing');
    this.router.navigateByUrl('/level/' + alias);
  }
}
