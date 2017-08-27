import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Level } from '../_models/level';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
  providers: [HTTPService]
})
export class LevelComponent implements OnInit {
  _id: string;
  level: Level = {name: '', photo: '', ans:'', js: ''};
  answer: any = {ans: ''};
  ansres: any = {status: '', nextalias:''};
  constructor(
    private router: Router,
    private http: HTTPService,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.http.authGet('http://localhost:8080/level/').subscribe(
      (res => console.log(res))
    );
    this.route.params.subscribe((param: ParamMap) => {
      this._id = param['id'];
      console.log(this._id);
      this.getLevel();
    });
  }
  getLevel(){
    this.http.authPGet('http://localhost:8080/getLevel', this._id)
      .subscribe(level => this.level = level);
  }

  submitForm(ans: any){
    this.http.authPostAns('http://localhost:8080/getAns', this._id, ans)
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
}
