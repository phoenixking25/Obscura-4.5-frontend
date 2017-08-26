import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/level';
import { SignupRes } from '../_models/response';
import { HTTPService } from '../_services/http.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.player['name'] = localStorage.getItem('name')
    this.player['email'] = localStorage.getItem('email')
  }
  
  submitForm(player: any){
    player['name'] = localStorage.getItem('name')
    player['email'] = localStorage.getItem('email')
    player['level'] = '1';
    player['levelId'] = 1;
    player['picture'] = 'kgkjh';
    this.http.post('http://localhost:8080/signup',player)
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
      alert(signupres['status']);
    }
  }
}