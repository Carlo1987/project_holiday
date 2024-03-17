import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable()
export class ExtraService{

    constructor(
        private _request : HttpClient
    ){}


    changeLanguage(language:string):Observable<any>{
        return this._request.get("http://localhost:3700/set_language/"+language);
    }


    getExtra():Observable<any>{
        return this._request.get('http://localhost:3700/extra');
    }


    update(data:any):Observable<any>{
        let params = JSON.stringify(data);
        let header = new HttpHeaders().set('Content-Type','application/json');
        return  this._request.put('http://localhost:3700/extra_update', params, {headers:header})
    }


    updateYear(year:number):Observable<any>{
        return this._request.get('http://localhost:3700/update_year/'+year);
    }
}