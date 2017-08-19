import { Component, OnInit, NgZone} from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import {HTTPService} from '../_services/http.service';

  
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

  
  constructor(
        private fb: FacebookService,
        private zone: NgZone, 
        private http : HTTPService
  ) {
    let initParams: InitParams = {
      appId: '482076445491176',
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    };
    fb.init(initParams);
   }
  
  ngOnInit(){}   

  loginWithFacebook(): void {
    const options = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
      .then((response: LoginResponse) => this.fbInfo(response.authResponse.accessToken))
      .catch((error: any) => console.error(error));
  }
  fbInfo(info: string): void{
    this.http.post('http://localhost:8080/getToken',info)
    this.http.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cemail%2Cpicture&format=json&access_token='+info)
            .subscribe();
  }
  
}
