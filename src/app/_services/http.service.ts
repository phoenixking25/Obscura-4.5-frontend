import {Injectable,} from '@angular/core';
import { Http, Response,  RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {keys as _keys} from 'lodash';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class HTTPService  {
    constructor(private http: Http ){}
    private basepath = "";
    post(path:string='', body:any,  ) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let options = new RequestOptions({ headers: headers });
            let json='json='+ JSON.stringify(body)
            return this.http.post( this.basepath + path, json, options)
                .subscribe((res: Response) => { return res.json(); })
        }

    get(path:string='', parameters:any={},){
        // let keys=_keys(parameters)
        // let query='?'
        // for (let i=0; i<keys.length;i++){
        //     query=query+keys[i]+'='+parameters[keys[i]]+'&'
        // }
        return this.http.get(this.basepath + path )   
    }
}