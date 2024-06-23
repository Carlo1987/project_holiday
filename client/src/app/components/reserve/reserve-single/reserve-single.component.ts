import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { ActivatedRoute } from '@angular/router';
import { ReserveService } from 'src/app/services/reserve_service';
import { HomeService } from 'src/app/services/home_sercive';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-reserve-single',
  templateUrl: './reserve-single.component.html',
  styleUrls: ['./reserve-single.component.css'],
  providers: [ ReserveService , HomeService , UserService ]
})
export class ReserveSingleComponent implements OnInit{

  public url_acount:string = Global.url_acount;
  public url_home:string = Global.url_home;
  public language:any = Global.setLanguage();
  public reserve:any = {};
  public home:any = {};
  public user:any = {};
  public status_reserve:any = {};
  public progress:string = this.language.progress.toLowerCase();  
  public private_datas:any = {};
  public number_payments:number = 1;
  public method_payment:string = '';
  public cost:any = {};
  public refund:any = {};
  public advance:any = {};


  constructor(
    private _reserveService : ReserveService,
    private _homeService : HomeService,
    private _userService : UserService,
    private _route : ActivatedRoute
  ){}


  ngOnInit(): void {
    this.getReserve();

    if(localStorage.getItem('code_passw')){
      localStorage.removeItem('code_passw');
    }
  }


  getReserve():void{
    this._route.params.subscribe(param=>{                                           
      let id = param['id'];
  
      this._reserveService.getReserve(id).subscribe(response=>{
         this.reserve = response.reserve;
         this.number_payments = this.reserve.payment.length;  
         this.refund = this.reserve.refund; 
         this.advance = this.reserve.advance;
         
         this.cost = {
          final_cost : this.reserve.cost.final_cost,
          advance : this.reserve.advance.value_advance,
          rest_advance : this.reserve.advance.rest_advance
         }

         this._homeService.getHome(this.reserve.home_id).subscribe(response=>{
          this.home = response.home;
       
            this._userService.findUser(this.reserve.user_data._id).subscribe(response=>{
              if(response.message){
                console.log(response.message);
              }else{
                this.user = response.user;
              
                this.private_datas = {
                  email : this.censured(this.user.email,this.reserve.user_data._id),
                  cell : this.censured(this.user.cell,this.reserve.user_data._id),
                 }

                 this.status_reserve = Calendary.refund_filter(this.reserve.checkIn, this.reserve.checkOut);  
              }
              
            })
         })
      })
   })
  }



  censured(data:string|number,reserve_userID:string){
    let result = data;
    if(localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user')!).user;

      if(user._id != reserve_userID){
        result = "censured";
      }
    }
    return result;
  }


  methodPayment(payment:any){
    let result  = this.language.reserves.bank.toLowerCase();
    if(payment.type == 'card'){
      result = `${this.language.reserves.card.toLowerCase()} n° ****${payment.number.substr(payment.number.length-4,payment.number.length)}`
    }
    return result;
  }






 
}
