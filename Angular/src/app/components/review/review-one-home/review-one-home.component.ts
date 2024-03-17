import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-review-one-home',
  templateUrl: './review-one-home.component.html',
  styleUrls: ['./review-one-home.component.css'],
  providers: [ReviewService]
})
export class ReviewOneHomeComponent implements OnInit{
  public url_user:string;
  public home_id:string = '';
  public user:any = {};
  public check_user:boolean = true;
  public reviews_home:Array<any> = []; 
  public first_reviews:Array<any> = [];
  public stars_array:Array<any>;
  public message_error:string = '';
  @Input() language:any;
  @Output() send_average = new EventEmitter<number>();  



  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _reviewService : ReviewService
     ){
      this.url_user = Global.url_acount;
      this.stars_array = [
        {index: 1, white:"stella_bianca.png", yellow:"stella_gialla.png"},
        {index: 2, white:"stella_bianca.png", yellow:"stella_gialla.png"},
        {index: 3, white:"stella_bianca.png", yellow:"stella_gialla.png"},
        {index: 4, white:"stella_bianca.png", yellow:"stella_gialla.png"},
        {index: 5, white:"stella_bianca.png", yellow:"stella_gialla.png"} ];
     }



     ngOnInit(): void {
       this._route.params.subscribe(param=>{
        let home_id = param['id'];
        this.home_id = home_id;
        this.getReviewsHome(home_id);  
       })
    
      if(localStorage.getItem('user')){
        this.user = JSON.parse(localStorage.getItem('user')!).user;
      } 
     }


  
     getReviewsHome(home_id:number){      
       this._reviewService.reviewHome(home_id).subscribe(response=>{
        if(response.message){
          this.message_error = response.message;
        }else if(response.reviews){
          this.reviews_home = response.reviews;   
          this.first_reviews = this.reviews_home.filter((review:any,index:number)=> index <= 1);      
          
          if(this.reviews_home.length > 0){
            let assessments = [];
            for(let i=0; i<this.reviews_home.length; i++){
            this.getUser(i , this.reviews_home[i].user_id);     
            assessments.push(this.reviews_home[i].assessment);    
           }     
         
          let average = Global.average_reviews(assessments); 
          this.sendAverage(average);
          }
        }
       })
     }



     getUser(id:number , user_id:number){
      this._reviewService.getAvatar(user_id).subscribe(response=>{
         this.reviews_home[id].user_name =  response.user.name,
         this.reviews_home[id].user_surname =   response.user.surname,
         this.reviews_home[id].user_image =   response.user.image
      })
     } 


     modify(review_id:string){
       this._router.navigate(['modify-review/'+review_id]);
     }



     delete(review_id:string){
       this._reviewService.deleteReview(review_id).subscribe(response=>{
        if(response.review){
          location.reload(); 
        }
      })       
     }



     newReview(){
      this.check_user = true;
      if(!localStorage.getItem('user')){
        this.check_user = false;
      }else{
        this._router.navigate(['create-review/'+this.home_id]);
      }
     }





     sendAverage(average:number){
        this.send_average.emit(average);                
     }

    

       
}








