import { Component , Input } from '@angular/core';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user_service';
import { ReviewService } from 'src/app/services/review_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [ UserService , ReviewService ]
})
export class ReviewsComponent {
  public token:string|null = Global.getToken();
  public language:any = Global.setLanguage();
  public url_user:string =Global.url_acount;
  public user:any = this._userService.identity(true);;
  public stars_array:Array<any>;
  @Input() reviews:Array<any> = [];  


  constructor(
    private _router : Router,
    private _userService : UserService,
    private _reviewService : ReviewService
  ){
    this.stars_array = [
      {index: 1, white:"stella_bianca.png", yellow:"stella_gialla.png"},
      {index: 2, white:"stella_bianca.png", yellow:"stella_gialla.png"},
      {index: 3, white:"stella_bianca.png", yellow:"stella_gialla.png"},
      {index: 4, white:"stella_bianca.png", yellow:"stella_gialla.png"},
      {index: 5, white:"stella_bianca.png", yellow:"stella_gialla.png"} 
    ];
  }




  edit(review_id:string,action:string){
    if(action == 'edit'){
      this._router.navigate(['modify-review/'+review_id]);
    }else if(action == 'delete'){
      this._reviewService.deleteReview(review_id,this.token).subscribe(response=>{
        if(response.review){
          location.reload(); 
        }else{
          console.log(response);
        }
      })   
    }
   }
}
