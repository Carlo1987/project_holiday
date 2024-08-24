import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review_service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css'],
  providers: [ReviewService]
})
export class CreateReviewComponent implements OnInit{
  @ViewChild ('countdown') countdown!:ElementRef;
  public language:any = Global.setLanguage();
  public token:string|null = Global.getToken();
  public url:string = Global.url_home;
  public message_error:string = '';
  public message_success:string = '';
  public title:string = this.language.review.new_comment;
  public bottom:string = this.language.review.button_new;
  public user_id:number = 0;
  public home_id:number = 0;
  public data:any;
  public stars_value:Array<number> = [1,2,3,4,5];
  public review_created:boolean = false;


  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _reviewService : ReviewService
  ){
    this.data = {user_id: 0, home_id: 0, assessment:0 , review:'', progressive:0};
  }


  ngOnInit(): void {
    if(localStorage.getItem('user_review') && !localStorage.getItem('user') || localStorage.getItem('user')){
      this.title = this.language.review.new_comment;
      this.bottom = this.language.review.button_new;

      if(localStorage.getItem('user_review') && !localStorage.getItem('user')){
        this.user_id = JSON.parse(localStorage.getItem('user_review')!).user_id;
      }else if(localStorage.getItem('user')){
        this.user_id = JSON.parse(localStorage.getItem('user')!).user._id;
      }
     
      this._route.params.subscribe(param=>{       
        this.home_id = param['id'];
      })  
      this.data.user_id = this.user_id;
      this.data.home_id = this.home_id;
      this.getLastReview();   

    }else{
      this._router.navigate(['']);
    }
       
  }




  getLastReview(){
    this._reviewService.lastReviews().subscribe(response=>{
      if(response.review){
        this.data.progressive = response.review[0].progressive +1;
        
      }else if(response.progressive){
        this.data.progressive = response.progressive;
      
      }
    })
  }


  getReview(){
    this.message_error = '';
    this.message_success = '';

    if(this.data.assessment == 0){
      this.message_error = this.language.review.error_vote; 
    }else if(this.data.review == ''){
      this.message_error = this.language.review.error_review;
    }else if(this.data.assessment != 0 && this.data.review != ''){
   
       this._reviewService.saveReview(this.data).subscribe(response=>{

        if(response.review){
          this.message_success =  this.language.review.success;

        }else if(response.message){
          this.message_error = response.message;
        }
      }) 
    }
  }



  starBucle(index:number, img:string){
    let stars = document.querySelectorAll('.star');
    for(let i=0; i<index; i++){
      stars[i].setAttribute("src",img)
    }
  }



  starHover(index:number){    
    if(!this.review_created){
        this.starBucle(index, "../../../../assets/img/stella_gialla.png");
    }
  }


  starOut(index:number){
    if(!this.review_created){
      this.starBucle(index, "../../../../assets/img/stella_bianca.png");
    }
  }



  starClick(vote:number){
    this.review_created = true;
    this.starBucle(5, "../../../../assets/img/stella_bianca.png");
    this.starBucle(vote, "../../../../assets/img/stella_gialla.png");
    this.data.assessment = vote;
  }





  

}
