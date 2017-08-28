import {Injectable,} from '@angular/core';
import { Http, Response,  RequestOptions,Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthServices  {
    req: string = '';

    constructor(private http: Http,
                private router: Router
    ){}

    isLoggedIn(){
        this.req = localStorage.getItem('token');
        if(this.req){
            return true;
        }
        else{
            this.router.navigateByUrl('/login');
            return false;
        }    
        
    }
}