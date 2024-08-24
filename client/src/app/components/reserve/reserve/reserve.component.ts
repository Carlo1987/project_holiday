import { Component, OnInit, DoCheck , Input , ViewChild , ElementRef } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { reserve_model } from 'src/app/models/reserve/reserve';
import { ExtraService } from 'src/app/services/extra_service';
import { Router } from '@angular/router';
import { user_reserve } from 'src/app/models/reserve/user_reserve';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
  providers: [ExtraService]
})
export class ReserveComponent implements OnInit,DoCheck{
  @Input() language:any;
  @Input() home_data:any;
  @ViewChild('select',{static:true}) select!:ElementRef<HTMLSelectElement>;

  public url_acount:string = Global.url_acount;
  private url_front:string = Global.url_index_front;
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
      this.home_data = {
        _id: '', 
        name: '', 
        guests: 0, 
        calendary_reserve: {}, 
        calendary_price: {} 
       }; 

     
       this.getExtra();
     
       Global.deleteReserve(); 
  }



  ngDoCheck(): void {

    
    this.optionsGuests();    
    Calendary.starting_calndaries_reserves(this.home_data.calendary_reserve, this.home_data.calendary_price);   
    
  }



  optionsGuests(){    
    let html = "";
    for(let i=1; i<=this.home_data.guests; i++){
      let option = `<option value="${i}"> ${i} </option>`;
      if(i == this.reserve.guests){
        option = `<option value="${i}" selected> ${i} </option>`;
      }
     
      html += option;
    }
  
    this.select.nativeElement.innerHTML = html;
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
    let data_user = user_reserve;
    data_user._id =  Global.createID();  
    let navigate = "/reserve-noLogin";

    if(localStorage.getItem('user')){ 
      data_user = JSON.parse(localStorage.getItem('user')!).user;
      navigate = "/reserve";
    }

      this.reserve.home_id = this.home_data._id;
      this.reserve.home_data = {
         name : this.home_data.name,
         avatar : this.home_data.avatar
      }

        this.reserve.user_data = data_user;
        
        let calendaryFunction = Calendary.get_date_reserve(this.reserve , this.extra);
        
        if(typeof(calendaryFunction) == 'string'){
          this.message_error = calendaryFunction;

         }else if(typeof(calendaryFunction) == 'boolean' && !calendaryFunction
                  || typeof(calendaryFunction) == 'boolean' && calendaryFunction){
            window.location.href = `${this.url_front}/reserve-blocked/${this.home_data._id}`;  

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
          this.reserve.refund.limit =  Calendary.date_limitRefund(this.reserve.refund.days, this.reserve.checkIn);
      
          let data = {
            reserve : this.reserve,
            expiration :  Global.create_expiration_sessions(10)
           }
      
          localStorage.setItem('reserve',JSON.stringify(data));  
          this._router.navigate([navigate]);  
          
        }

  }


}
