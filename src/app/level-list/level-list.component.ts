import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/level';
import { SignupRes } from '../_models/response';
import { HTTPService } from '../_services/http.service';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css'],
  providers: [HTTPService]
})
export class LevelListComponent implements OnInit {
  level: any = {'name': '', 'levelNo': null, 'nextUrl': '', 'picture': '', 'html': '', 'js': '', 'hint': '', 'ans': ''};

  constructor(
    private http: HTTPService,
    private router: Router,
    public snackBar: MdSnackBar,
  ) { }

  ngOnInit() {
    this.getLevelList();
  }
  Logout(): void{
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  ourTeam(): void{
    this.router.navigateByUrl('/team');
  }
  openSnackBar(status: string){
    this.snackBar.open(status, 'Try Again Later',{
      duration: 2500,
    });
  }
  getLevelList(){
    this.http.authGet('/levelList/')
              .subscribe();
  }
}
