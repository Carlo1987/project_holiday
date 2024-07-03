import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class ReviewService{
   public url:string;

    constructor(
        private _request : HttpClient
    ){
       this.url = Global.url_review;
    }



    saveReview(data:any):Observable<any>{
        let params = JSON.stringify(data);
        let header = new HttpHeaders().set('Content-Type','application/json');
        return this._request.post(this.url+'/save', params , {headers:header});
    }



    getReview(id:string):Observable<any>{
        return this._request.get(this.url+'/get_review/'+id);
    }



    lastReviews():Observable<any>{
        return this._request.get(this.url+'/reviews');
    }



    reviewHome(home_id:number):Observable<any>{
        return this._request.get(this.url+'/review_home/'+home_id);
    }



    getAvatar(user_id:number):Observable<any>{
        return this._request.get(this.url+'/get_avatar/'+user_id);
    }



    updateReview(id:string, review:any,token:any):Observable<any>{
        let param = JSON.stringify(review);
        let header = new HttpHeaders().set('Content-Type','application/json')
                                      .set('Authorization',token);
        return this._request.put(this.url+'/update_review/'+id, param, {headers:header});
    }



    deleteReview(id:string,token:any):Observable<any>{
        let header = new HttpHeaders().set('Authorization',token);
        return this._request.delete(this.url+'/delete_review/'+id, {headers:header});
    }
}