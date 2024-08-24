import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Global } from "./global";

@Injectable()
export class ExtraService{
    private url:string = Global.url+'/extra';

    constructor(
        private _request : HttpClient
    ){}



    getExtra():Observable<any>{
        return this._request.get(this.url+'/get_extra');
    }


    update(data:any,role:string,token:any):Observable<any>{
        let json = {
            data : data,
            role : role
        }
        let params = JSON.stringify(json);
        let header = new HttpHeaders().set('Content-Type','application/json')
                                      .set('Authorization',token);
        return  this._request.put(this.url+'/update_extra', params, {headers:header})
    }


    updateYear(year:number):Observable<any>{
        return this._request.get(this.url+'/update_year/'+year);
    }


    contact(data:any):Observable<any>{
        let params = JSON.stringify(data);
        let header = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/contact',params,{headers:header});
    }
}