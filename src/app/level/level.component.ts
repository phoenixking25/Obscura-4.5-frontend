import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Level } from '../_models/level';
import { Router } from '@angular/router';


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
  constructor(
    private router: Router,
    private http : HTTPService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.http.authGet('http://localhost:8080/level/').subscribe(
      (res => console.log(res))
    );
    this.route.params.subscribe((param: ParamMap)=>{
      this._id = param['id'];
      console.log(this._id);
      this.getLevel();
    });
  }
  

  getLevel(){
    this.http.authPGet('http://localhost:8080/getLevel',this._id)
      .subscribe(level => this.level = level);
    
  }

  submitForm(ans: any){
    this.http.authPostAns('http://localhost:8080/getAns',this._id,ans)
    .subscribe();
  }
  Logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  leaderboard(): void{
    this.router.navigateByUrl('/leaderboard');
  }
}
