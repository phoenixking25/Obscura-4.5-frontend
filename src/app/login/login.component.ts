import { Component, OnInit, NgZone} from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { AuthService, AppGlobals } from 'angular2-google-login';

  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  imageURL: string;
  email: string;
  name: string;
  token: string;
  LoginOptions: any;
  
  constructor(
        private fb: FacebookService,
        private auth: AuthService,
        private zone: NgZone
  ) {
    let initParams: InitParams = {
      appId: '482076445491176',
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    };
    fb.init(initParams);
   }

  
  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '802725431757-hjgkfe6valnvupeletpn8jjfgo2p80fk.apps.googleusercontent.com';
    this.getData();
    setTimeout(() => { this.googleAuthenticate() }, 50);
  }

  loginWithFacebook(): void {
    const options = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
      .then((response: LoginResponse) => console.log(response))
      .catch((error: any) => console.error(error));
  }

  googleAuthenticate() {
    let self = this;
    this.auth.authenticateUser((result) => {
      console.log('result: ', result);
      // Using Angular2 Zone dependency to manage the scope of variables
      self.zone.run(() => {
        self.getData();
      });
    });
  }
  
  logout(){
    this.auth.userLogout(()=>{
      this.clearLocalStorage();
    });
  }
  getData() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
}
  
}
