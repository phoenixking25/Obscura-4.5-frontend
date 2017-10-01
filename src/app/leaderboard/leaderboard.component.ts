import { Component, OnInit, NgZone, AfterViewInit} from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Player } from '../_models/level';
import { LeaderBoard } from '../_models/leaderboard';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { Alias } from '../_models/Alias';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  providers: [HTTPService]
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderBoard[] = [{username: '', college: '', level: ''}];
  alias: Alias = {alias: '', status: ''};
  reload: boolean = true;
  level: any[] = [{'name': '', 'levelNo': null}];

  constructor(
    private http: HTTPService,
    private router: Router,
    public snackBar: MdSnackBar,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.getPlayer();
    this.getLevelList();
  }
  getPlayer() {
    this.http.authGet('http://localhost:8080/leaderboard/')
      .subscribe(leaderboard => this.leaderboard = leaderboard);
  }
  Logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  getAlias(): void{
    this.http.authGet('http://localhost:8080/level/').subscribe(alias => this.navigator(alias));
  }
  navigator(alias: any): void{
    if (alias['status'] === 'success') {
      this.router.navigateByUrl('/level/' + alias['alias']);
    }
    else {
      this.openSnackBar(alias['status']);
    }
  }
  ourTeam(): void{
    this.router.navigateByUrl('/team');
  }
  openSnackBar(status: string){
    this.snackBar.open(status, 'Try Again Later',{
      duration: 2500,
    });
  }
  reloadPage() {
    this.reload = false;
    this.zone.runOutsideAngular(() => {
        location.reload();
    });
  }
  getLevelList(){
    this.http.authGet('http://localhost:8080/levelList/')
              .subscribe(level => this.level = level);
  }
  openLevel(alias: string){
    this.router.navigateByUrl('/level/' + alias);
  }
}
