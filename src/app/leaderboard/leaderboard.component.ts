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
  alias: any ;
  reload: boolean = true;
  level: any[] = [{'name': '', 'levelNo': null}];
  private basepath = "http://localhost:4200";

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
    this.http.authGet('/leaderboard/')
      .subscribe(leaderboard => this.leaderboard = leaderboard);
  }
  Logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  getAlias(){
    this.http.authGet('/level/').subscribe(alias => this.navigator(alias));
  }
  navigator(alias: any){
    if (alias['status'] == 'success') {
      // this.router.navigateByUrl('/level/' + alias['alias']);
      window.location.href = this.basepath +  '/#/level/' + alias['alias'] ;
    } else {
      this.openSnackBar(alias['msg']);
    }
  }
  ourTeam(){
    this.router.navigateByUrl('/team');
  }
  openSnackBar(status: string){
    this.snackBar.open(status, 'OK',{
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
    this.http.authGet('/levelList/')
              .subscribe(level => this.level = level);
  }
  openLevel(alias: string){
    this.router.navigateByUrl('/level/' + alias);
  }
}
