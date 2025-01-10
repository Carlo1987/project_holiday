import { Component, OnInit , ViewChild , ElementRef} from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router'; 
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { reserve_model } from 'src/app/models/reserve/reserve';
import { user_reserve } from 'src/app/models/reserve/user_reserve';
import { ExtraService } from 'src/app/services/extra_service';
import { HomeService } from 'src/app/services/home_sercive';


@Component({
  selector: 'app-reserve-blocked',
  templateUrl: './reserve-blocked.component.html',
  styleUrls: ['./reserve-blocked.component.css'],
  providers : [ ExtraService , HomeService ]
})
export class ReserveBlockedComponent implements OnInit {
  public language:any = Global.setLanguage();
  public url:string = Global.url_home;
  private url_front:string = Global.url_home_front;
  public extra:any;
  public reserve:any = reserve_model;
  public order_reserve:any;
  public homes:Array<any> = [];
  public home:any = {};
  public selected_home:string = '';
  public loading:boolean = false;

  public current_year:number = new Date().getFullYear();  
  public year_calendary:number = this.current_year; 

  public message_error:string = '';

  @ViewChild('chose_home',{static:true}) chosed_home!:ElementRef<HTMLSelectElement>;
  @ViewChild('guests_number',{static:true}) guests_number!: ElementRef<HTMLSelectElement>;
  @ViewChild('mounths',{static:true}) mounths!:ElementRef<HTMLDivElement>;


  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _homeService : HomeService,
    private _extraService : ExtraService
  ){}


  ngOnInit(): void {
  
    this.getHome();
    this.getHomes();
    this.getExtra();

    Global.deleteReserve(); 
  }



  getHomes(){
    this._homeService.getHomes().subscribe(response=>{
      this.homes = response.homes;
      this.optionsHomes(this.homes);
    })
  }



  getHome(){
    this._route.params.subscribe(param=>{                                           
      let home_id = param['home_id'];

      this._homeService.getHome(home_id).subscribe(response=>{ 
        this.buildCalendary(response.home);    
      })
    })
  }




  setHome(){
    let home = this.homes.filter(e => e._id == this.selected_home);
    home = home[0]; 
    this.buildCalendary(home);
  }



  buildCalendary(home:any){
    this.home = home;
    this.selected_home = this.home._id;

    Calendary.starting_calndaries_reserves(this.home.calendary_prices.reserves, this.home.calendary_prices.prices); 
    this.optionsGuests();
    this.showCalendary();  
  }



  optionsHomes(homes:any){
    let html = "";
   
   homes.forEach((home:any)=>{
    let option = `<option value="${home._id}"> ${home.name} </option>`;

    if(home._id == this.home._id){
      option = `<option value="${home._id}" selected> ${home.name} </option>`
    }

    html += option;
   })
   this.chosed_home!.nativeElement.insertAdjacentHTML('afterbegin' , html);
  }





  optionsGuests(){
    let html = "";
    for(let i=1; i<=this.home.guests; i++){
      let option = `<option value="${i}"> ${i} </option>`;
      if(i == this.reserve.guests){
        option = `<option value="${i}" selected> ${i} </option>`;
      }
      html += option;
    }
   this.guests_number!.nativeElement.insertAdjacentHTML('afterbegin' , html);
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



  
  showCalendary(){
    
    let calendary = Calendary.show_calendaries(this.year_calendary);   
    let reserves = calendary.reserves;
 
    let container_mounths = "";
   
     calendary.prices.forEach((day:any,index:number)=>{    
       let container_day = ``;
       for(let i=1; i<=Calendary.total_days_mounth(this.year_calendary)[index]; i++){
         let price = '€'+day[i];
         let style_day = '';
         let reserved = "";
 
         if(day[i] == 'bloccato' || typeof(reserves[index][i]) == 'string' && reserves[index][i] != 'bloccato' 
            || typeof(day[i]) == 'number' && day[i] == 0 || Calendary.checkDates(this.year_calendary, (index+1), i)){
          
          price = `<i class='fa fa-ban' style='color: #dd2727;' aria-hidden='true'></i>`;
         } 


         container_day += `
          <div class="container_day">
            <div class="day" ${style_day}> <p> ${i} </p> </div>
            <div class="element"> <p> ${price} </p> </div>
            ${reserved}
          </div>`
       }
   
        let html = `
        <div class="container_mounth">
          <div class="mounth_name"> <p> ${Calendary.mounth_names()[index]} </p> </div>
        
          <div class="mounth">
            ${ container_day }
          </div>
         </div>`;
 
         container_mounths += html
      
     })
     this.mounths.nativeElement.innerHTML = container_mounths;
   }




   link(id:string){
    let url = `${this.url_front}/${id}`;
    window.open(url, "", "width=800,height=800")
   }


 setReserve(){
  this.message_error = '';
  let data_user = user_reserve;
  data_user._id =  Global.createID();  
  let navigate = "/reserve-noLogin";

  if(localStorage.getItem('user')){ 
    data_user = JSON.parse(localStorage.getItem('user')!).user;
    navigate = "/reserve";
  }

    this.reserve.home_id = this.home._id;
    this.reserve.home_data = {
       name : this.home.name,
       avatar : this.home.avatar
    }

      this.reserve.user_data = data_user;
      
      let calendaryFunction = Calendary.get_date_reserve(this.reserve , this.extra);
      
      if(typeof(calendaryFunction) == 'string'){
        this.message_error = calendaryFunction;

       }else if(typeof(calendaryFunction) == 'boolean' && !calendaryFunction
                || typeof(calendaryFunction) == 'boolean' && calendaryFunction){
        this.message_error = this.language.calendary.dates_blocked;  

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
