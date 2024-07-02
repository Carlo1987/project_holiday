import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Home } from "../models/home/home";
import { Global } from "./global";


@Injectable()
export class HomeService {
    public url:string;

  constructor(
    private _request : HttpClient
  ){
    this.url = Global.url_home;
  }


  saveHome(home:Home,role:string,token:any):Observable<any>{
    let json = {
      data : home,
      role : role
    }
    let params = JSON.stringify(json);
    let header = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
    return this._request.post(this.url+'/save', params, {headers:header});
 }


 getHomes():Observable<any>{
  return this._request.get(this.url+'/get_homes');
 }


 getHome(id:string):Observable<any>{
  return this._request.get(this.url+'/get_one_home/'+id);
 }



 updateDatas(id:string,datas:any,role:string,token:any):Observable<any>{
    let json = {
      data : datas,
      role : role
    }
    let params = JSON.stringify(json);
    let header = new HttpHeaders().set('Content-type','application/json')
                                  .set('Authorization',token);
    return this._request.put(this.url+'/update_datasHome/'+id, params, {headers:header});
 }




 updateDetails(id:string,datas:any,role:string,token:any):Observable<any>{
  let json = {
    data : datas,
    role : role
  }
  let params = JSON.stringify(json);
  let header = new HttpHeaders().set('Content-type','application/json')
                                .set('Authorization',token);
  return this._request.put(this.url+'/update_detailsHome/'+id, params, {headers:header});
}




updatePrices(id:string,datas:any,role:string,token:any):Observable<any>{
  let json = {
    data : datas,
    role : role
  }
  let params = JSON.stringify(json);
  let header = new HttpHeaders().set('Content-type','application/json')
                                .set('Authorization',token);
  return this._request.put(this.url+'/update_pricesHome/'+id, params, {headers:header});
}




 delete_image(id:string,image:string,token:any):Observable<any>{
  let header = new HttpHeaders().set('Authorization',token);
  return this._request.get(this.url+'/delete_image/'+id+'/'+image, {headers:header} );
 }




 delete_home(id:string,token:any):Observable<any>{
  let header = new HttpHeaders().set('Authorization',token);
  return this._request.delete(this.url+'/delete_home/'+id, {headers:header});
 }




 update_price_newYear(id:string, home:any):Observable<any>{
    let params = JSON.stringify(home);
    let header = new HttpHeaders().set('Content-type','application/json');
    return this._request.post(this.url+'/update_price_newYear/'+id, params, {headers:header} );
 }





}




