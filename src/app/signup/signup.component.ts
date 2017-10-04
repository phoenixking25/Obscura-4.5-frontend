import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/level';
import { SignupRes } from '../_models/response';
import { HTTPService } from '../_services/http.service';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [HTTPService]
})
export class SignupComponent implements OnInit {
  player: Player = {name:'', email:'', username:'', college:'', phone: null, level:'', levelId: null, picture:''};
  signupres: SignupRes = {status:''};

  constructor(
    private http: HTTPService,
    private router: Router,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.player['name'] = localStorage.getItem('name')
    this.player['email'] = localStorage.getItem('email')
  }

  submitForm(player: any){
    player['name'] = localStorage.getItem('name')
    player['email'] = localStorage.getItem('email')
    player['level'] = '0';
    player['levelId'] = 0;
    player['picture'] = 'kgkjh';
    this.http.post('/signup',player)
    .subscribe(signupres => this.created(signupres));
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  created(signupres: any): void{
    if(signupres['status'] == 'created'){
      localStorage.setItem('token', signupres['token']);
      this.router.navigateByUrl('/leaderboard');
    }
    else{
      this.openSnackBar(signupres['status']);
    }
  }
  openSnackBar(status: string){
    this.snackBar.open(status, 'Try Again',{
      duration: 2500,
    });
  }
}
