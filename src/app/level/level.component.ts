import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Level } from '../_models/level';
import { Router, NavigationEnd } from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
  providers: [HTTPService]
})
export class LevelComponent implements OnInit {
  _id: string;
  clevel: any = {d_name: '', name: '', photo: '', ans:'', js: '', html:''};
  answer: any = {ans: ''};
  ansres: any = {status: '', nextalias:''};
  level: any[] = [{'name': '', 'levelNo': null}];
  private sub: any;
  private basepath = "http://localhost:4200";
  islevel12: boolean = false;
  constructor(
    private router: Router,
    private http: HTTPService,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getLevelList();
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
      .subscribe(clevel => this.runjs(clevel));
  }
  runjs(clevel: any){
    this.clevel = clevel;
    console.log(clevel.levelNo);
    if(clevel.name == '12'){
      this.islevel12 = true;
    }
    clevel['html'] = this._sanitizer.bypassSecurityTrustHtml(clevel['html']);
    setTimeout(function() {
      eval(clevel.js);
    }, 1000)
  }

  submitForm(ans: any){
    this.http.authPostAns('/level', this._id, ans)
    .subscribe(ansres => this.navigator(ansres));
    this.answer['ans'] = '';
    }
    navigator(alias: any): void{
      this.openSnackBar(alias['msg']);
      if (alias['status'] === 'success') {
        // this.router.navigateByUrl('/level/' + alias['nextalias']);
        window.location.href = this.basepath +  '/#/level/' + alias['nextalias'] ;
      }
    }
  Logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  leaderboard(): void{
    this.router.navigateByUrl('/leaderboard');
  }
  openSnackBar(msg: string){
    this.snackBar.open(msg, 'OK',{
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

