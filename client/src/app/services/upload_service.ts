import { Injectable } from "@angular/core";
import { Global } from "./global";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UploadService{
    public url_user:string;
    public url_home:string;


    constructor(
        private _request : HttpClient
    ){
        this.url_user = Global.url_acount;
        this.url_home = Global.url_home;
    }


    upload_userImage(id:any, file:any):Observable<any>{    // ,token:any
       // let headers = new HttpHeaders().set('Authorization',token);
        return this._request.post(this.url_user+'/uploadImage/'+id, file    /* , {he  aders:headers} */);
    }


    upload_homeAvatar(id:string,file:any,token:any):Observable<any>{
        let headers = new HttpHeaders().set('Authorization',token);
        return this._request.post(this.url_home+'/upload_avatar/'+id , file, {headers:headers});
    }


    upload_homeImages(id:string,file:any,token:any):Observable<any>{
        let headers = new HttpHeaders().set('Authorization',token);
        return this._request.post(this.url_home+'/upload_images/'+id , file, {headers:headers});
    }
 


  
        
    
    
    
 
       

}