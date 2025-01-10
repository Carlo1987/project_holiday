import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { HomeService } from 'src/app/services/home_sercive';
import { ExtraService } from 'src/app/services/extra_service';
import { ReserveService } from 'src/app/services/reserve_service';
import { UserService } from 'src/app/services/user_service';
import { payment_card } from 'src/app/models/reserve/payment_card'; 
import { payment_bank } from 'src/app/models/reserve/bank';


@Component({
  selector: 'app-extra-service',
  templateUrl: './extra-service.component.html',
  styleUrls: ['./extra-service.component.css'],
  providers: [HomeService, ExtraService, ReserveService , UserService ]
})
export class ExtraServiceComponent implements OnInit{

  @ViewChild('guests_number',{static:true}) guests_number!: ElementRef<HTMLSelectElement>;
  public language:any = Global.setLanguage();
  public token:string|null = Global.getToken();
  public url_home:string = Global.url_home;
  public countdown_value:any;
  public countdown_adapted:string = '';
  public extra:any;
  public hours:any = {};
  public reserve:any;
  public order_reserve:any;
  public home_data:any;
  public home_name:string = '';
  public home_avatar:string = '';
  public year:number = new Date().getFullYear();
  public date_reserve:any;
  public discount_access:string = 'NO';
  public final_cost:number = 0;

  ////   pagamenti
  public payment_method:string = "card";
  public payment_card:any = payment_card;
  public payment_bank:any = payment_bank;
  public advance_value:string = "";
  public set_method:boolean = false;

  ///  mesi degli anni
  public mounths_name:Array<string> = Calendary.mounth_names();
  public mounths_currentYear:Array<number>;
  public mounths_nextYear:Array<number>
  
  ///  messaggi
  public message_error:string = '';
  public message_update:string = '';
  public info_discount:boolean = false;
  public message_error_method:string = '';
  public message_error_payment:string = '';
  public message_error_session:string = this.language.reserves.expired_session;
  public loading:boolean = false;

  constructor(
    private _router : Router,
    private _homeService : HomeService,
    private _extraService : ExtraService,
    private _reserveService : ReserveService,
    private _userService : UserService
  ){
    this.mounths_currentYear = Calendary.total_days_mounth(this.year);
    this.mounths_nextYear = Calendary.total_days_mounth(this.year+1);
    this.reserve = JSON.parse(localStorage.getItem('reserve')!).reserve;
  }


  ngOnInit(): void {
     if(!localStorage.getItem('reserve'))    this._router.navigate(['']);

      this.set_countdown_reserve();
      this.getExtra();
      this.getHomeData(this.reserve.home_id);
      Calendary.starting_calndaries_reserves(this.reserve.home_calendary.reserves, this.reserve.home_calendary.prices);  
      if(this.reserve.discount.set)    this.discount_access = this.language.reserves.yes;
      /// set
      this.showCalendary();      
  }



  getExtra(){
    this._extraService.getExtra().subscribe(response=>{
        this.extra = response.extra;
        this.hours= this.extra.hours;
    })
  } 



  getHomeData(id:string){
      this._homeService.getHome(id).subscribe(response=>{
        this.home_data = response.home;    
        this.home_name = response.home.name;
        this.home_avatar = response.home.avatar;
        localStorage.setItem('reserve_start',JSON.stringify(response.home.calendary_prices));
        this.optionsGuests();    
        
      })
  }



  set_countdown_reserve(){
    this.countdown_value = JSON.parse(localStorage.getItem('reserve')!).expiration;  
     this.countdown_adapted = Calendary.adapt_hour(this.countdown_value.hour);     
  } 




  infoDiscount(){  this.info_discount = true; }
  closeInfo(){  this.info_discount = false; }
   

  optionsGuests(){
    let html = "";
    for(let i=1; i<=this.home_data.guests; i++){
      let option = `<option value="${i}"> ${i} </option>`;
      if(i == this.reserve.guests){
        option = `<option value="${i}" selected> ${i} </option>`;
      }
      html += option;
    }
   this.guests_number!.nativeElement.insertAdjacentHTML('afterbegin' , html);
  }



  calendary_bucles(setMounths:Array<number>, setCalendary_reserve:any, year:number, setCalendary_price:any){
    let checkIn = Calendary.date_reserveSplit(this.reserve.checkIn);
    let mounths = "";

    for(let x=0; x<12; x++){  
      let day = "";

      for(let i=1; i<=setMounths[x]; i++){
        let content = setCalendary_reserve[x][i];
        let container_style = "style='background-color:white'"
       if(!content || content == 0 || typeof(content) == 'string' && content != this.reserve.user_data._id  || Calendary.checkDates(year, (x+1), i) ){
          content = "<i class='fa fa-ban' style='color: #dd2727;' aria-hidden='true'></i>";
        }else if(typeof(content) == 'boolean' && content){
          content = "<p> €"+ setCalendary_price[x][i] +" </p>";
        }else if(typeof(content) == 'string' && content == this.reserve.user_data._id){
          container_style = "style='background-color:rgb(230, 212, 212)'";
          content =  "<p style='color:red'> €"+ setCalendary_price[x][i] +" </p>";
        }     

           day += `
           <div class="container_day" ${container_style}>
           <div class="day"><p>${i}</p></div>
           <div class="element"> ${content} </div>
         </div>`;
      }

      let class_name = "carousel-item";
      if(x == checkIn.mounth && checkIn.year == year)   class_name = "carousel-item active";

      const button_left = `
      <button class="carousel-control-prev" style="width: 45px;"  type="button" data-bs-target="#carouselCalendary" data-bs-slide="prev">
      <span class="carousel-control-prev-icon  btn btn-dark rounded" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
      </button>  `;

      const button_rigth = `
      <button class="carousel-control-next" style="width: 45px;" type="button" data-bs-target="#carouselCalendary" data-bs-slide="next">
      <span class="carousel-control-next-icon  btn btn-dark rounded" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
      </button>     `;


      mounths += `
      <div class="${class_name}">
      <div class="d-block container_mounth">
        <div class="mounth_name position-relative"> ${button_left}  <p class="p-1"> ${this.mounths_name[x]}  ${year} </p>  ${button_rigth}  </div>
        <div class="mounth">
           ${day}
        </div>
      </div>
    </div>`;
    }

    return mounths;
  }
 


   showCalendary(){
    /////  carousel
    let carousel = document.querySelector('.calendary_availability');
    let old_carousel = document.querySelectorAll('.carousel-item');
    old_carousel.forEach(e => e.remove());
    let mounths = "";

    mounths += this.calendary_bucles(this.mounths_currentYear, this.reserve.home_calendary.reserves.current_year, this.year, this.reserve.home_calendary.prices.current_year);
    mounths += this.calendary_bucles(this.mounths_nextYear, this.reserve.home_calendary.reserves.next_year, this.year+1, this.reserve.home_calendary.prices.next_year);

   carousel?.insertAdjacentHTML('afterbegin',mounths);

   ///// date 
   this.date_reserve = Calendary.adapt_date(this.reserve.checkIn, this.reserve.checkOut);
  }
 




  updateReserve(){
    this.message_error = '';
    this.message_update = '';

    if(Global.expiration(this.countdown_value)){                     //   se la sessione della prenotazione non è scaduta...
     let starting_reserve = JSON.parse(localStorage.getItem('reserve')!).reserve;
     let starting_calendary = JSON.parse(localStorage.getItem('reserve_start')!);

    Calendary.starting_calndaries_reserves(starting_calendary.reserves , starting_calendary.prices);
    let calendaryFunction = Calendary.get_date_reserve(this.reserve, this.extra);
    
     if(typeof(calendaryFunction) == 'string' ){                     //  se le date non sono valide...
         this.reserve = starting_reserve;
         this.message_error = calendaryFunction;
          
     }else if(typeof(calendaryFunction) == 'boolean' && !calendaryFunction){     //  se le date non sono disponibili...
      this.message_error = this.language.calendary.dates_blocked;
     
    }else{                                                         //   se le date sono disponibili....
      this.order_reserve = calendaryFunction;
      this.reserve.total_nights = this.order_reserve.nights;
      this.reserve.discount.set = this.order_reserve.discount.set;
      this.reserve.discount.value = this.order_reserve.discount.value;
      this.reserve.cost.total_cost = this.order_reserve.cost.total_cost;
      this.reserve.cost.discounted_cost = this.order_reserve.cost.discounted_cost;
      this.reserve.cost.final_cost = this.order_reserve.cost.final_cost;
      this.reserve.home_calendary = this.order_reserve.calendary_home;

      if(this.reserve.discount.set){
        this.discount_access =  this.language.reserves.yes;
      }else{
        this.discount_access = 'NO';
      }   
      this.reserve.advance.value_advance = Calendary.advancesValues(this.reserve).value_advance;
      this.reserve.advance.rest_advance = Calendary.advancesValues(this.reserve).rest_advance;
      this.reserve.refund.limit =  Calendary.date_limitRefund(this.reserve.refund.days, this.reserve.checkIn);

       let data = {
        reserve : this.reserve,
        expiration : Global.create_expiration_sessions(10)
       }
       localStorage.setItem('reserve',JSON.stringify(data));   
       
       this.set_countdown_reserve();
       this.showCalendary();
       this.message_update = this.language.reserves.upgraded_dates;              
      }                                                                       
  
    }else{                                                   //   se la sessione della prenotaizione è scaduta...       
      this.message_error = this.message_error_session;
    }    
    
  }
 

   chosePayment(){
   this.set_method = true;
  } 



  getPayment(event:any){
    this.payment_method = event.method
    if(this.payment_method == 'card'){
     this.payment_card = event.data
    }else{
      this.payment_bank = event.data;
     } 
  }




  setStorage(){
    let storage = { reserve : this.reserve , expiration : Global.create_expiration_sessions(10) }
             
    localStorage.setItem('reserve', JSON.stringify(storage));

    return {reserve : JSON.parse(localStorage.getItem('reserve')!).reserve , lang : this.language.language};  
  }




  payment(data:any){
    if(this.reserve.payment.lenght == 1){
      this.reserve.payment.pop();
      this.reserve.payment.push(data);
    }else{
      this.reserve.payment.push(data);
    }
  
  }




  getReserve(){
    this.message_error_method = '';
    this.message_error_payment = '';

    if(Global.expiration(this.countdown_value)){             //   se la sessione non è scaduta

    let check_payment = false;

    if(!this.set_method){
      this.message_error_method = this.language.reserves.chose_payment;
    }

    if(this.payment_method == 'card'){
      if(this.payment_card.number == this.language.reserves.number_card || this.payment_card.expiration == "MM/AA" || this.payment_card.secure_code == "CVV" || this.payment_card.email == "example@email.com"
        || this.payment_card.number == "" || this.payment_card.expiration == "" || this.payment_card.secure_code == "" || this.payment_card.email == ""){
        this.message_error_payment = this.language.reserves.error_card;
      }else{
        this.payment(this.payment_card);
        check_payment = true;
      }
    }else if(this.payment_method == 'bank'){
      this.payment(this.payment_bank);
      check_payment = true;
    }
  
    if(check_payment && this.set_method){
     
       this.loading = true;
       let user_data = this.reserve.user_data;


       if(user_data._id.substr(0,7) == 'NOLOGIN'){                              /*   se l'utente non è registrato  */

        /*    salvo/cerco utente non registrato e cambio id nel calendario prenotazione della casa  */
          this._userService.findUser_noLogin(user_data).subscribe(response=>{

            if(response.message){
                console.log(response.message);
            }else{
              
              let id_result = {
                oldID : user_data._id,
                newID : response.user._id
               } 

               let calendary = this.reserve.home_calendary.reserves;
               let new_calendary = Calendary.setID_userReserve(calendary , id_result);  
               
               this.reserve.home_calendary.reserves = new_calendary;
               this.reserve.user_data._id = id_result.newID;
              
               /*    prenotazione  per utente non loggato  */
               this.setReserve(this.setStorage());    
        
            }         
          })
       
        }else{
          /*    prenotazione per utente loggato */
          this.setReserve(this.setStorage());      
        }
        this.loading = false;
    }

    }else{                                                       //   se la sessione è scaduta
      this.message_error_method = this.message_error_session;
    }
  }




  setReserve(data:any){
    this._homeService.getHome(data.reserve.home_id).subscribe(response=>{      
      Calendary.starting_calndaries_reserves(response.home.calendary_prices.reserves, response.home.calendary_prices.prices);  
      let calendaryFunction = Calendary.get_date_reserve(this.reserve, this.extra);

    if(typeof(calendaryFunction) == 'boolean' && !calendaryFunction          /*  se le date non risultano libere...   */
        || typeof(calendaryFunction) == 'boolean' && calendaryFunction){     
          this._router.navigate(['reserve-rejected/'+data.reserve.home_id]);
    
    }else{                                                                   /*  se le date risultano libere... fa la prenotazione!   */
      this._reserveService.saveReserve(data).subscribe(response=>{
        if(response.reserve && response.home){
          this._router.navigate(['reserve-success/'+response.reserve._id]);
        }else{
          console.log(response.message);
        } 
       }) 
      
    }
      
    })

  }


}
