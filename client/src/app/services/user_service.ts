import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Global } from "./global";
import { Router } from "@angular/router";
import { User } from "../models/user";

@Injectable()
export class UserService{
    public url:string;


    constructor(
        private _request : HttpClient,
        private _router : Router
    ){
        this.url = Global.url_acount;
    }


   identity(data:boolean){
        if(localStorage.getItem('user')){
            return JSON.parse(localStorage.getItem('user')!).user;
        }else{
            if(!data)     this._router.navigate(['']);            
            return false;
        }
    }



    admin(){
        if(localStorage.getItem('user')){
          let userStorage = JSON.parse(localStorage.getItem('user')!);
      
          if(userStorage.user.status == 'admin'){
            return true;
          }else{
            this._router.navigate(['']);   
            return false;
          }
        }
        return false;
    }
 

    saveUser(user:User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/save', params, {headers:headers});
    }




    loginUser(user:Object , getToken:null|boolean = null):Observable<any>{

         if(getToken != null){
            getToken = true;
        }  

        let params = JSON.stringify({ user , getToken : getToken});  
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._request.post(this.url+'/login' , params ,{headers:headers}); 
    }



    findUser(id:string):Observable<any>{
        return this._request.get(this.url+'/getUser/'+id);
    }


    findUser_noLogin(data:any):Observable<any>{
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/getUser_noLogin', params,{headers:headers}) ;
    }



    updateUser(id:string , user:any , token:any ):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization',token);   
        return this._request.put(this.url+'/update/'+id , params ,{headers:headers});
    }



    updatePassword(id:string,password:any,token:any):Observable<any>{
        let params = JSON.stringify(password);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization',token);
        return this._request.post(this.url+'/updatePassword/'+id , params , {headers:headers});
    }



    deleteUser(id:string,token:any):Observable<any>{
        let headers = new HttpHeaders().set('Authorization',token);
        console.log(headers);
        
        return this._request.get(this.url+'/delete/'+id , {headers:headers});
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



    editRole(data:any,token:any,role:string):Observable<any>{
        let json = {
            data : data,
            role : role
        }
        let params = JSON.stringify(json);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization',token);
       return this._request.post(this.url+'/editRole', params , {headers:headers});
    }

}