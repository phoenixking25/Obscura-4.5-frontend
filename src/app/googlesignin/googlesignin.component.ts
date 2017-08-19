import {Component, ElementRef, AfterViewInit, VERSION} from '@angular/core';
import {HTTPService} from '../_services/http.service';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button md-raised-button id="googleBtn" >Login with Google</button>',
  providers: [HTTPService]
})
export class GooglesigninComponent implements AfterViewInit {
  token: string;
  private clientId:string = '802725431757-hjgkfe6valnvupeletpn8jjfgo2p80fk.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  
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
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.token = googleUser.getAuthResponse().id_token;
        this.googleInfo(this.token)
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef,
              private http: HTTPService
  ) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }
  googleInfo(token: string): void{
    this.http.post('http://localhost:8080/getToken',token)
    this.http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+token)
            .subscribe();
  }

}