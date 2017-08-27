import {Component, ElementRef, AfterViewInit, VERSION, OnInit} from '@angular/core';
import {HTTPService} from '../_services/http.service';
import 'rxjs/add/operator/map';
import { LoginRes } from '../_models/response';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button md-raised-button id="googleBtn" >Login with Google</button>',
  providers: [HTTPService]
})
export class GooglesigninComponent implements OnInit, AfterViewInit {
  token: string;
  id: string;
  name: string;
  image: string;
  email: string;
  googleRes: string[];
  bar: boolean;
  private clientId = '802725431757-hjgkfe6valnvupeletpn8jjfgo2p80fk.apps.googleusercontent.com';
  loginres: LoginRes = {status: '', token: '', backend: '', provider: ''};

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;

  ngOnInit(){
    this.bar = false;
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.token = googleUser.getAuthResponse().id_token;
        this.id = profile.getId();
        this.email = profile.getEmail();
        this.name = profile.getName();
        this.image = profile.getImageUrl();
        this.googleInfo(this.token, this.email)
        this.bar = true;
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef,
              private http: HTTPService,
              private router: Router
  ) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }
  googleInfo(token: string, email: string): void{
    this.http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+token).subscribe()
    this.http.post('http://localhost:8080/getToken/',{"token":token, "email":email, "provider":"google"})
    .subscribe(loginres => this.navigate(loginres));
  }
  navigate(loginres : any): void{
    if (loginres['status'] == 'success'){
      localStorage.setItem('token',loginres['token'])
      this.router.navigateByUrl('/leaderboard');
    }
    else{
      this.router.navigateByUrl('/signup');
    }
  }  

}