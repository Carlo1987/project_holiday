import { Component , OnChanges , Input , Output, EventEmitter , ViewChild , ElementRef } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';


@Component({
  selector: 'app-home-calendary',
  templateUrl: './home-calendary.component.html',
  styleUrls: ['./home-calendary.component.css']
})
export class HomeCalendaryComponent implements OnChanges {
  public language:any = Global.setLanguage();
  public mounths_names:Array<string> = this.language.mounth_names;
  @Input() home:any;
  @Input() message_calendary:string = '';
  @Input() loading:boolean = false;
  @Input() admin:boolean = false;
  @Output() home_calendary = new EventEmitter();  
  @ViewChild('mounths',{static:true}) mounths!:ElementRef<HTMLDivElement>;

  public current_year:number = new Date().getFullYear();   
  public year_calendary:number = this.current_year; 
  public days_january:Array<number> = Calendary.days_january;
  public first_mounth:number = 1;
  public second_mounth:number = 1;
  public total_days_mounth:number = 31; 
  public price_value:number = 0;
  public first_date_price:any;
  public second_date_price:any; 


  public message_error_calendary:string = '';
  public message_success_calendary:string = '';
  public message_success_save:string = '';
  public saved:boolean = false;


  ngOnChanges(): void {
    this.showCalendary();    
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

        if(day[i] == 'bloccato') price = `<i class="fa-solid fa-lock" style="color: #dd2727;"></i>`;

        if(typeof(reserves[index][i]) == 'string' && reserves[index][i] != 'bloccato'){          
           style_day = `style="background-color:green"`;
           reserved = `<p class="reserved">  reserved  </p>`;
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




  
  
 getDays(Value:string){

  let Mounth = this.first_mounth
  let class_name = ".first_day";

  if(Value == 'checkOut'){
    Mounth = this.second_mounth;
    class_name = ".second_day";
  }

  this.total_days_mounth = Calendary.total_days_mounth(this.year_calendary)[Mounth-1];

  let optionsHtml = document.querySelectorAll(`${class_name} option`);
  optionsHtml.forEach(e=> e.remove());

  let select = document.querySelector( class_name );
  let options = "";

  for(let i=1; i<=this.total_days_mounth; i++){
    if(Value == "checkIn"){
      options += `<option value="${i}" data-firstValue=${i}> ${i} </option>`;
    }else if(Value == "checkOut"){
      options += `<option value="${i}"> ${i} </option>`;
    }
    
  }
    
  select?.insertAdjacentHTML('afterbegin', options);
 } 






getValue(Value:number){
  this.message_error_calendary = '';
  this.message_success_calendary = '';
  this.saved = false;

  let Message = this.language.calendary.block;

  if(Value != 0){
    Value = this.price_value;
    Message = this.language.homes_edit.prices_success;
  }

  let first_day:any = document.querySelector('.first_day');
  let second_day:any = document.querySelector('.second_day');
 
  this.first_date_price = first_day.value+'-'+this.first_mounth;
  this.second_date_price = second_day.value+'-'+this.second_mounth;

  let calendary_prices = Calendary.getPrices(this.first_date_price , this.second_date_price, this.year_calendary, Value);
 
  if(typeof(calendary_prices) != "string"){
    this.home.calendary_prices = calendary_prices;
    this.message_success_calendary = Message;
    this.showCalendary();
  }else{
    this.message_error_calendary = calendary_prices;
  }
}



sendData(){   
  this.message_error_calendary = '';
  this.message_success_calendary = '';

  if(this.admin){
    this.home_calendary.emit(this.home);     
    this.saved = true;    
  }else{
    this.message_error_calendary = this.language.homes_edit.no_update;
  }
                      
}



}
