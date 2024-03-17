import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Home } from 'src/app/models/home';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { HomeService } from 'src/app/services/home_sercive';
import { UploadService } from 'src/app/services/upload_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css'],
  providers: [HomeService , UploadService]
})
export class SaveComponent implements OnInit{
  public language:any = Global.initial_language;
  //  messaggi
  public message_form:string = this.language.homes_edit.message_field;
  public message_success:string = '';
  public message_error_image:string = '';
  public message_error_calendary:string = '';
  public message_success_calendary:string = '';
  //  dati casa
  public home:Home;
  public avatar:any;
  public images:Array<any> = [];
  //  formulari
  public title_form:string = this.language.homes.title_save;
  public datas_form:boolean = true;
  public details_form:boolean = false;
  public prices_form:boolean = false;
  // calendario prezzi-blocco prenotazioni
  public current_year:number;
  public days_january:Array<number> = Calendary.days_january;
  public mounths_names:Array<string> = this.language.mounth_names;
  public first_mounth:number = 1;
  public second_mounth:number = 1;
  public total_days_mounth:number = 31;
  public year_calendary:number;
  public price_value:number = 0;
  public first_date_price:any;
  public second_date_price:any; 
  @ViewChild ('buttons_files',{static:true}) buttons_files!:ElementRef<HTMLButtonElement>;
  @ViewChild ('button_files',{static:true}) button_files!:ElementRef<HTMLButtonElement>;


  constructor(
    private _homeService : HomeService,
    private _uploadService : UploadService,
    private _router : Router
  ){
    this.language = Global.setLanguage();
    this.title_form = this.language.homes.title_save;
    this.mounths_names = this.language.mounth_names;
    this.message_form = this.language.homes_edit.message_field;
    this.home = new Home("","","","",0,0,0,'','','','');
    this.current_year = new Date().getFullYear();
    this.year_calendary = this.current_year;           
  }



  
  ngOnInit(): void {
     if(!localStorage.getItem('user') || !Global.if_session_admin()) this._router.navigate(['']);

     this.home.beds = Global.initial_beds_home();
     this.home.details = Global.initial_details_home();
     this.home.calendary_prices = Calendary.initial_calendary_prices();     
     this.showCalendary();               
    }



  save(){
       ////  dati casa  ////    
    this._homeService.saveHome(this.home).subscribe(dataSaved=>{    
        let formData = new FormData(); 

        //// immagine avatar/sfondo della casa ////
            formData.set('avatar', this.avatar);
            this._uploadService.upload_homeAvatar(dataSaved.home._id , formData).subscribe(response =>{
            console.log(response);     }); 

        ////  immagini della casa  ////
         for(let i=0; i<this.images.length; i++){
              formData.set('images',this.images[i]);
              this._uploadService.upload_homeImages(dataSaved.home._id , formData).subscribe(response=>{
              console.log(response); 
                })        
            } 
    })  
      setTimeout(function(){
        window.location.href = "http://localhost:4200";
      }, 2000);
  }


  buttonWrongFormat(button:any){
    button.nativeElement.style.backgroundColor = "rgb(219, 53, 53)";
    button.nativeElement.style.width = "110px";
    button.nativeElement.innerHTML = this.language.acount.choose_file ; 
  }
 

  changeButtonFile(type:string){
    this.message_error_image = '';
    if(!Global.type_file(type)){
      this.message_error_image = this.language.acount.message_wrong_file;
      this.buttonWrongFormat(this.button_files); 

    }else{
      this.button_files.nativeElement.style.backgroundColor = "rgb(99, 150, 216)";
      this.button_files.nativeElement.style.width = "160px";
      this.button_files.nativeElement.innerHTML = `  <i class="fa fa-file-image-o" aria-hidden="true"></i>  ${this.language.acount.selected}` ;    
    }
  }



  avatar_home(file:any){
        this.avatar = file.target.files[0];     
        this.changeButtonFile(this.avatar.type);   
  }


 
  changeButtonImages(color:string){
    this.buttons_files.nativeElement.style.backgroundColor = color;
    this.buttons_files.nativeElement.style.width = "160px";
    this.buttons_files.nativeElement.innerHTML = `  <i class="fa fa-file-image-o" aria-hidden="true"></i> ${this.images.length} ${this.language.homes_edit.added_images}` ; 
  }


  images_home(files:any){
    this.message_error_image = '';
    this.images = <Array<File>>files.target.files;
    if(this.images.length >= 5){
 
      let check = true;

      for(let i=0; i<this.images.length; i++){
        if(!Global.type_file(this.images[i].type)){
          check = false;
        }     
      }
   
      if(check){
         this.changeButtonImages("rgb(99, 150, 216)");    
      }else{
       this.message_error_image = this.language.acount.message_wrong_file; 
       this.buttonWrongFormat(this.buttons_files);  
      }
    }else{
      this.message_error_image = this.language.homes.min_images;
         this.changeButtonImages("rgb(219, 53, 53)");   
    }
   
  }


  detailsForm(){ 
      this.message_error_image = '';
      if(this.images.length >= 5){
        this.datas_form = false;
        this.details_form = true;
        this.title_form = this.language.homes.details.title;
      }else{
        this.buttonWrongFormat(this.buttons_files);
        this.message_error_image = this.language.homes.min_images;
      }
     
  }


  pricesForm(){
    this.details_form = false;
    this.details_form = false;
    this.prices_form = true;
    this.title_form = this.language.homes.pricce_title;
  }


getFirstDays(){
  this.total_days_mounth = Calendary.total_days_mounth(this.year_calendary)[this.first_mounth-1];
  let optionsHtml = document.querySelectorAll('.first_day option');
  optionsHtml.forEach(e=> e.remove());

  let select = document.querySelector('.first_day');
  let options = "";
  for(let i=1; i<=this.total_days_mounth; i++){
     options += `<option value="${i}" data-firstValue=${i}> ${i} </option>`;
  }
    
  select?.insertAdjacentHTML('afterbegin', options);
}


getSecondDays(){
  this.total_days_mounth = Calendary.total_days_mounth(this.year_calendary)[this.second_mounth-1];
  let optionsHtml = document.querySelectorAll('.second_day option');
  optionsHtml.forEach(e=> e.remove());

  let select = document.querySelector('.second_day');
  let options = "";
  for(let i=1; i<=this.total_days_mounth; i++){
     options += `<option value="${i}"> ${i} </option>`;
  }
    
  select?.insertAdjacentHTML('afterbegin', options);
}




getPrices(){
  this.message_error_calendary = '';
  this.message_success_calendary = '';
  let first_day:any = document.querySelector('.first_day');
  let second_day:any = document.querySelector('.second_day');
 
  this.first_date_price = first_day.value+'-'+this.first_mounth;
  this.second_date_price = second_day.value+'-'+this.second_mounth;
  let calendary_prices = Calendary.getPrices(this.first_date_price , this.second_date_price, this.year_calendary, this.price_value);
  if(typeof(calendary_prices) != "string"){
    this.home.calendary_prices = calendary_prices;
    this.message_success_calendary = this.language.homes_edit.prices_success;
    this.showCalendary();    
  }else{
    this.message_error_calendary = calendary_prices;
  }
}



getBlock(){
  this.message_error_calendary = '';
  this.message_success_calendary = '';
  let first_day:any = document.querySelector('.first_day');
  let second_day:any = document.querySelector('.second_day');
 
  this.first_date_price = first_day.value+'-'+this.first_mounth;
  this.second_date_price = second_day.value+'-'+this.second_mounth;
  let calendary_prices = Calendary.getPrices(this.first_date_price , this.second_date_price, this.year_calendary, 0);
  if(typeof(calendary_prices) != "string"){
    this.home.calendary_prices = calendary_prices;
    this.message_success_calendary = this.language.calendary.block;
    this.showCalendary();
  }else{
    this.message_error_calendary = calendary_prices;
  }
}




showCalendary(){
  let calendary = Calendary.show_calendaries(this.year_calendary);
 
   let mounths = document.querySelectorAll('.container_mounth');
  mounths.forEach(e=> e.remove()); 

  const container = document.querySelector('.container_mounths');

  calendary.forEach((day:any,index:number)=>{    
    let container_day = ``;
    for(let i=1; i<=Calendary.total_days_mounth(this.year_calendary)[index]; i++){
      let price = '€'+day[i];
      if(day[i] == 'bloccato') price = `<i class="fa-solid fa-lock" style="color: #dd2727;"></i>`;
      container_day += `
       <div class="container_day">
         <div class="day"> <p> ${i} </p> </div>
         <div class="element"> <p> ${price} </p> </div>
       </div>`
    }

     let html = `
     <div class="container_mounth">
       <div class="mounth_name"> <p> ${Calendary.mounth_names()[index]} </p> </div>
     
       <div class="mounth">
         ${ container_day }
       </div>
      </div>`;
    
     container?.insertAdjacentHTML('beforeend',html);
  })
}




}
