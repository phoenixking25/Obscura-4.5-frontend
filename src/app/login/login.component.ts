import { Component, OnInit, NgZone} from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import {HTTPService} from '../_services/http.service';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { LoginRes } from '../_models/response';

  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ HTTPService]
})
export class LoginComponent implements OnInit {
  imageURL: string;
  email: string;
  name: string;
  token: string;
  LoginOptions: any;
  fbRes: string[];
  loginres: LoginRes = {status:'', token: '', backend:''};
  bar: boolean;

  
  constructor(
        private fb: FacebookService,
        private zone: NgZone, 
        private http : HTTPService,
        private router: Router
  ) {
    let initParams: InitParams = {
      appId: '482076445491176',
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    };
    fb.init(initParams);
   }
  
  ngOnInit(){
    this.bar = false;
  }

  loginWithFacebook(): void {
    const options = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
      .then((response: LoginResponse) => this.fbInfo(response.authResponse.accessToken))
      .catch((error: any) => console.error(error));
    this.bar = true;
  }
  fbInfo(token: string): void{
    this.http.post('http://localhost:8080/getToken/', {token, 'provider': 'facebook'})
    .subscribe(loginres => this.navigate(loginres));
    this.http.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cemail%2Cpicture&format=json&access_token='+token).subscribe()
  }
  navigate(loginres : any): void{
    if (loginres['status'] == 'success'){
      localStorage.setItem('token', loginres['token']);
      this.router.navigateByUrl('/leaderboard');
    }
    else{
      this.router.navigateByUrl('/signup');
      localStorage.setItem('name', loginres['name']);
      localStorage.setItem('email', loginres['backend']);
    }
  }
  
}
