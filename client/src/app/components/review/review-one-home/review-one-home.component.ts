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
  public home_id:string = '';
  public first_reviews:Array<any> = [];
  public reviews_home:Array<any> = [];
  public checkLogin:boolean = false;

  //public stars_array:Array<any>;
  public message_error:string = '';
  @Input() language:any;
  @Output() send_average = new EventEmitter<number>();  


  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _reviewService : ReviewService
     ){}

     ngOnInit(): void {

      if(localStorage.getItem('user'))     this.checkLogin = true;

       this._route.params.subscribe(param=>{
        let home_id = param['id'];
        this.home_id = home_id;
        this.getReviewsHome(home_id);  
       })
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





     newReview(){
      if(!localStorage.getItem('user')){
        this._router.navigate(['review-noLogin/'+this.home_id]);
      }else{
        this._router.navigate(['create-review/'+this.home_id]);
      } 
     }





     sendAverage(average:number){
        this.send_average.emit(average);                
     }

    

       
}








