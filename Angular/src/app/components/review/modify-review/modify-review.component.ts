import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-modify-review',
  templateUrl: '../create-review/create-review.component.html',
  styleUrls: ['./modify-review.component.css'],
  providers: [ReviewService]
})
export class ModifyReviewComponent implements OnInit{
  public language:any = Global.initial_language;
  public title:string = this.language.review.edit_comment;
  public bottom:string = this.language.acount.button;
  public message_error:string = '';
  public data:any;
  public review_created:boolean = false;
  public stars_value:Array<number> = [1,2,3,4,5];


  constructor(
    private _router : Router,
    private _route : ActivatedRoute,
    private _reviewService : ReviewService
  ){}


  ngOnInit(): void {
    if(localStorage.getItem('user')){
       this.language = Global.setLanguage();
       this.title = this.language.review.edit_comment;
       this.bottom = this.language.acount.button;

       this._route.params.subscribe(param=>{
        let id = param['id'];
        this.getData(id);
       })
    }else{
      this._router.navigate(['']);
    }
    
  }



  getData(id:string){
     this._reviewService.getReview(id).subscribe(response=>{
      this.data = response.review;
      console.log(this.data);
      
     })
  }


  getReview(){
    this.message_error = '';
    if(this.data.assessment == 0){
      this.message_error = this.language.review.error_vote; 
    }else if(this.data.review == ''){
      this.message_error = this.language.review.error_review;
    }else if(this.data.assessment != 0 && this.data.review != ''){
      
      this._reviewService.updateReview(this.data._id, this.data).subscribe(response=>{
        if(response.review){

       const div = document.querySelector('.review_messages');
        let number = 4;
        let message = this.language.review.success;
        let span = document.createElement('div'); 
        span.className = "alert alert-success text-center fs-4";
        span.append(`${message} (${number})`);
        div?.insertAdjacentElement('afterbegin',span);

        setInterval(function(){
          number--;
          span.remove();
          span = document.createElement('div'); 
          span.className = "alert alert-success text-center fs-4";
          span.append(`${message} (${number})`);
          div?.insertAdjacentElement('afterbegin',span);
                
          if(number <= 0){
          window.location.href = "http://localhost:4200/home/"+response.review.home_id;
         }   
          },1000);
    
        }else if(response.message){
          this.message_error = response.message;
        }
      }) 
    }
  }



  starBucle(index:number, img:string){
    let stars = document.querySelectorAll('.star img');
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
