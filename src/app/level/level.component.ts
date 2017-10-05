import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Level } from '../_models/level';
import { Router, NavigationEnd } from '@angular/router';
import {MdSnackBar} from '@angular/material';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
  providers: [HTTPService]
})
export class LevelComponent implements OnInit {
  _id: string;
  clevel: any = {name: '', photo: '', ans:'', js: ''};
  answer: any = {ans: ''};
  ansres: any = {status: '', nextalias:''};
  level: any[] = [{'name': '', 'levelNo': null}];
  private sub: any;
  constructor(
    private router: Router,
    private http: HTTPService,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.http.authGet('/level/').subscribe(
      (res => console.log(res))
    );
    this.route.params.subscribe((param: ParamMap) => {
      this._id = param['id'];
      this.getLevel();
    });
  }
  getLevel(){
    this.http.authPGet('/level', this._id)
      .subscribe(clevel => this.clevel = clevel);
  }

  submitForm(ans: any){
    this.http.authPostAns('/level', this._id, ans)
    .subscribe(ansres => this.navigator(ansres));
    this.answer['ans'] = '';
    }
    navigator(alias: any): void{
      if (alias['status'] === 'success') {
        this.router.navigateByUrl('/level/' + alias['nextalias']);
      }
      else {
        this.openSnackBar();
      }
    }
  Logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  leaderboard(): void{
    this.router.navigateByUrl('/leaderboard');
  }
  openSnackBar(){
    this.snackBar.open('Wrong Answer', 'Try Again',{
      duration: 2500,
    });
  }
  ourTeam(): void{
    this.router.navigateByUrl('/team');
  }
  openLevel(alias: string){
    this.router.navigateByUrl('/level/' + alias);
  }
  getLevelList(){
    this.http.authGet('/levelList/')
              .subscribe(level => this.level = level);
  }
}
