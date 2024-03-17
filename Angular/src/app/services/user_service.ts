import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Global } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService{
    public url:string;


    constructor(
        private _request : HttpClient
    ){
        this.url = Global.url_acount;
    }


    saveUser(user:User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/save', params, {headers:headers});
    }




    loginUser(user:any):Observable<any>{
       let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/login' , params ,{headers:headers}); 
    }



    findUser(id:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.get(this.url+'/getUser/'+id , {headers:headers});
    }



    updateUser(id:string , user:any):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.put(this.url+'/update/'+id , params ,{headers:headers});
    }



    updatePassword(id:string,password:any):Observable<any>{
        let params = JSON.stringify(password);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/updatePassword/'+id , params , {headers:headers});
    }



    deleteUser(id:string):Observable<any>{
        return this._request.delete(this.url+'/delete/'+id);
    }



    forgotPassword(data:any):Observable<any>{
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/sendToken', params, {headers:headers});
    }



    verifyToken(token:any):Observable<any>{
        let params = JSON.stringify(token);
        let headers = new HttpHeaders().set('Content-Type','application/json'); 
        return this._request.post(this.url+'/verifyToken', params, {headers:headers});
    }
  


    resetPassword(id:string , password:any):Observable<any>{
        let params = JSON.stringify(password);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/resetPassword/'+id, params, {headers:headers});
    }



    editRole(data:any):Observable<any>{
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/editRole', params , {headers:headers});
    }

}