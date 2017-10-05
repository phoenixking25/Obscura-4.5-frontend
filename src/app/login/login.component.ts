import { Component, OnInit, NgZone} from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import {HTTPService} from '../_services/http.service';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { LoginRes } from '../_models/response';

declare const gapi: any;

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
  id: string;
  token: string;
  LoginOptions: any;
  fbRes: string[];
  loginres: LoginRes = {status: '', token: '', backend: '', provider: ''};
  bar: boolean = false;
  private basepath = "http://obscuranitkkr.co.in";
  constructor(
        private fb: FacebookService,
        private zone: NgZone,
        private http: HTTPService,
        private router: Router
  ) {
    gapi.load('auth2', function () {
      gapi.auth2.init()
   });
    const initParams: InitParams = {
      appId: '482076445491176',
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    };
    fb.init(initParams);
   }
  ngOnInit(){
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
    this.http.post('/getToken/', {token, 'provider': 'facebook'})
    .subscribe(loginres => this.navigate(loginres));
    this.http.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cemail%2Cpicture&format=json&access_token='+token).subscribe()
  }
  navigate(loginres: any): void {
    if (loginres['status'] === 'success'){
      localStorage.clear();
      localStorage.setItem('token', loginres['token']);
      localStorage.setItem('provider', loginres['provider']);
      if (localStorage.getItem('provider') == 'google'){
        window.location.href = this.basepath +  '/#/leaderboard';
      }
      this.router.navigateByUrl('/leaderboard');
    }
    else{
      localStorage.setItem('name', loginres['name']);
      localStorage.setItem('email', loginres['backend']);
      if (loginres['provider'] === 'google'){
        window.location.href = this.basepath + '/#/signup';
      }
      this.router.navigateByUrl('/signup');
    }
  }
  googleLogin() {
    this.bar = true;
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
       googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
        const profile = googleUser.getBasicProfile();
        this.token = googleUser.getAuthResponse().id_token;
        this.id = profile.getId();
        this.email = profile.getEmail();
        this.name = profile.getName();
        this.imageURL = profile.getImageUrl();
        this.googleInfo(this.token, this.email)
       });
    });
 }
  googleInfo(token: string, email: string): void{
  this.http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token).subscribe();
  this.http.post('/getToken/',{'token': token, 'email': email, 'provider': 'google'})
  .subscribe(loginres => this.navigate(loginres));
  }
}
