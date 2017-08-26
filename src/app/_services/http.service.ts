import {Injectable,} from '@angular/core';
import { Http, Response,  RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {keys as _keys} from 'lodash';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class HTTPService  {
    constructor(private http: Http ){}
    private basepath = "";
    post(path:string='', body:any,  ) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            let json = JSON.stringify(body)
            return this.http.post( this.basepath + path, json, options)
            .map((res: Response) => {return res.json();})
    }

    get(path:string='', parameters:any={},){
        return this.http.get(this.basepath + path ) 
        .map((res: Response) => {return res.json();})  
    }

    authGet(path:string=''){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth', localStorage.getItem('token'));
        let options = new RequestOptions({headers: headers});
        // if(Object.keys(parameters).length > 0){
        //     return this.http.get(this.basepath + path +'/'+ parameters, options ) 
        //     .map((res: Response) => {return res.json();})  
        // }
        return this.http.get(this.basepath + path, options ) 
        .map((res: Response) => {return res.json();})  
    }

    authPGet(path:string='', parameters:any={},){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth', localStorage.getItem('token'));
        let options = new RequestOptions({headers: headers});
        // if(Object.keys(parameters).length > 0){
        //     return this.http.get(this.basepath + path +'/'+ parameters, options ) 
        //     .map((res: Response) => {return res.json();})  
        // }
        return this.http.get(this.basepath + path +'/'+ parameters, options ) 
        .map((res: Response) => {return res.json();})  
    }

    authPost(path:string='', body:any,  ) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth', localStorage.getItem('token'));
            let options = new RequestOptions({ headers: headers });
            let json = JSON.stringify(body)
            return this.http.post( this.basepath + path, json, options)
            .map((res: Response) => {return res.json();})
    }
    authPostAns(path:string='',parameters: any ={}, body:any,  ) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth', localStorage.getItem('token'));
        let options = new RequestOptions({ headers: headers });
        let json = JSON.stringify(body)
        return this.http.post( this.basepath + path +'/'+ parameters, json, options)
        .map((res: Response) => {return res.json();})
}
}