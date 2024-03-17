import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveService } from 'src/app/services/reserve_service';
import { HomeService } from 'src/app/services/home_sercive';
import { payment_card } from 'src/app/models/payment_card'; 
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-complete-reserve',
  templateUrl: './complete-reserve.component.html',
  styleUrls: ['./complete-reserve.component.css'],
  providers: [ReserveService, HomeService]
})
export class CompleteReserveComponent implements OnInit{
  public language:any = Global.initial_language;
  public reserve:any;
  public home_name:string = '';
  public payment:number = 0;
  public payment_method:string = "card";
  public payment_card:any = payment_card;
  public message_error:string = '';
  public message_success:string = '';

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _reserveService : ReserveService,
    private _homeService : HomeService
  ){ }


  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.language = Global.setLanguage();

      this._route.params.subscribe(param=>{
        let id = param['id'];
        this.getReserve(id);
      })
    console.log(this.payment_method);
    
    }else{
      this._router.navigate(['']);
    }
    
  }


  getReserve(id:string){
    this._reserveService.getReserve(id).subscribe(response=>{
        this.reserve = response.reserve;
        this.payment = response.reserve.advance.rest_advance;
        console.log(this.reserve);
        this._homeService.getHome(this.reserve.home_id).subscribe(home=>{
          this.home_name = home.home.name;
        })
        
    })
  }


  completePayment(){
    this.message_error = '';
    this.message_success = '';
    let check_payment = false;
    if(this.reserve.advance.set == "true"){
      if(this.payment_method == 'card'){
        if(this.payment_card.number == this.language.reserves.number_card || this.payment_card.expiration == "MM/AA" || this.payment_card.secure_code == "CVV" || this.payment_card.email == this.language.reserves.example_email
          || this.payment_card.number == "" || this.payment_card.expiration == "" || this.payment_card.secure_code == "" || this.payment_card.email == ""){
          this.message_error = this.language.reserves.error_card;
        }else{
         this.reserve.advance.set = "false";
         check_payment = true;
        }
      }else if(this.payment_method == "bank"){
        this.reserve.advance.set = "false";
        check_payment = true;
      }

      if(check_payment){
        let data = { reserve : this.reserve , lang : this.language.language };
        this._reserveService.updateReserve(this.reserve._id, data).subscribe(response=>{
          if(response.reserve){
            this.message_success = this.language.complete_payment.success;
          }
        })
      }
     
    }else{
      this.message_error = this.language.complete_payment.error;
    }
  }



  deleteMessages(){
    this.message_error = '';
    this.message_success == '';
  }

 



}
