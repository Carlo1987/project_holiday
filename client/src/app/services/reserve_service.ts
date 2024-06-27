import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class ReserveService {
    public url:string;


    constructor(
        private _request : HttpClient
    ){
        this.url = Global.url_reserve;
    }


    saveReserve(data:any):Observable<any>{
         let param = JSON.stringify(data);
         let header = new HttpHeaders().set('Content-Type','application/json');
         return this._request.post(this.url+'/save_reserve', param, {headers : header});
    }



    getReserve(id:string):Observable<any>{

        return this._request.get(this.url+'/get_reserve/'+id);
    }



    getReserve_byUser(id:string,token:any):Observable<any>{
        let headers = new HttpHeaders().set('Authorization',token);
        return this._request.get(this.url+'/get_userReserve/'+id, {headers:headers});
    }



    getReserve_byHome(data:any,role:string,token:any):Observable<any>{
        let json = {
            data : data,
            role : role
        }
        let param = JSON.stringify(json);
        let header = new HttpHeaders().set('Content-Type','application/json')
                                      .set('Authorization',token);
        return this._request.post(this.url+'/get_homeReserve', param, {headers:header});
    }



    getReserves():Observable<any>{
        return this._request.get(this.url+'/get_reserves');
    }


    
    updateReserve(id:string, reserve:any):Observable<any>{
        let param = JSON.stringify(reserve);
        let header = new HttpHeaders().set('Content-Type','application/json');
        return this._request.put(this.url+'/update_reserve/'+id, param, {headers:header});
    }



    refund(id:string, calendary:any):Observable<any>{
        let param = JSON.stringify(calendary);
        let header = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/refund/'+id, param, {headers:header});
    }



}