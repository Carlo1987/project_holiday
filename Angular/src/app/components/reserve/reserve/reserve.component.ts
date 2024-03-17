import { Component, OnInit, Input } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { reserve_model } from 'src/app/models/reserve';
import { ExtraService } from 'src/app/services/extra_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
  providers: [ExtraService]
})
export class ReserveComponent implements OnInit{
  @Input() language:any;
  @Input() home_data:any;
  public url_acount:string = Global.url_acount;;
  public extra:any;
  public order_reserve:any;
  public reserve:any = reserve_model;
  public advance_reserve:any;
  /// messaggi  ////
  public message_error:string = '';
  public message_success:string = '';
  //// mese prenotazione
  public mounth:number = new Date().getMonth()+1;


  constructor(
    private _extraService : ExtraService,
    private _router : Router
  ){}


  
  ngOnInit(): void {  
       this.optionsGuests();     
       this.getExtra();
       Calendary.starting_calndaries_reserves(this.home_data.calendary_reserve, this.home_data.calendary_price);           
                     
       if(localStorage.getItem('reserve'))    localStorage.removeItem('reserve');
  }



  optionsGuests(){
    const select = document.querySelector('.people select');

    let html = "";
    for(let i=1; i<=this.home_data.guests; i++){
      let option = `
      <option value="${i}"> ${i} </option>`;
      html += option;
    }

    select?.insertAdjacentHTML('afterbegin' , html);
  }



  getExtra(){
    this._extraService.getExtra().subscribe(response=>{
        this.extra = response.extra;
        this.reserve.discount.days = this.extra.discount.days_discount;
        this.reserve.discount.value_percentage = this.extra.discount.value_discount;
        this.reserve.clean = this.extra.clean;
        this.reserve.advance.value = this.extra.advance;
        this.reserve.refund = this.extra.refund;
    })
  }




  getReserve(){
    this.message_error = '';
    if(localStorage.getItem('user')){
      this.reserve.home_id = this.home_data._id;
      this.reserve.home_data = {
         name : this.home_data.name,
         avatar : this.home_data.avatar
      }
      let data_user = JSON.parse(localStorage.getItem('user')!).user;

        this.reserve.user_data = {
          _id : data_user._id,
          name : data_user.name,
          surname : data_user.surname,
          email : data_user.email,
          cell : data_user.cell
        }
        
        let calendaryFunction = Calendary.get_date_reserve(this.reserve.checkIn , this.reserve.checkOut, this.extra, data_user._id, this.reserve.discount, this.reserve.clean);
        if(typeof(calendaryFunction) == 'string'){
          this.message_error = calendaryFunction;
        }else{
          this.order_reserve = calendaryFunction;
          this.reserve.total_nights = this.order_reserve.nights;
          this.reserve.discount.set = this.order_reserve.discount.set;
          this.reserve.discount.value = this.order_reserve.discount.value;
          this.reserve.cost.total_cost = this.order_reserve.cost.total_cost;
          this.reserve.cost.discounted_cost = this.order_reserve.cost.discounted_cost;
          this.reserve.cost.final_cost = this.order_reserve.cost.final_cost;
          this.reserve.advance.value_advance = Calendary.advancesValues(this.reserve).value_advance;
          this.reserve.advance.rest_advance = Calendary.advancesValues(this.reserve).rest_advance;
          this.reserve.home_calendary = this.order_reserve.calendary_home;
          this.reserve.refund.date =  Calendary.date_limitRefund(this.reserve.refund.days, this.reserve.checkIn);

          let data = {
            reserve : this.reserve,
            expiration :  new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()
           }
           localStorage.setItem('reserve',JSON.stringify(data));
           this._router.navigate(['/reserve']);  
        }
 
    }else{                                            //   se non si ha effettuato il login
      this.message_error = this.language.singleHome.error_holiday;
    }
  }


}
