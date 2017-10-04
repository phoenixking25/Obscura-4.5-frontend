import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../_services/http.service';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css'],
  providers: [HTTPService]
})
export class OurTeamComponent implements OnInit {
  level: any[] = [{'name': '', 'levelNo': null}];
  constructor(
    private router: Router,
    private http: HTTPService,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.getLevelList();
  }
  Logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  getAlias(): void{
    this.http.authGet('/level/').subscribe(alias => this.navigator(alias));
  }
  navigator(alias: any): void{
    if (alias['status'] === 'success') {
      this.router.navigateByUrl('/level/' + alias['alias']);
    }
    else {
      this.openSnackBar(alias['msg']);
    }
  }
  leaderboard(): void{
    this.router.navigateByUrl('/leaderboard');
  }
  openSnackBar(status: string){
    this.snackBar.open(status, 'OK',{
      duration: 2500,
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
