import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Home } from 'src/app/models/home';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home_sercive';
import { UploadService } from 'src/app/services/upload_service';
import { Calendary } from 'src/app/services/calendary';
import { Global } from 'src/app/services/global';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.component.html',
  styleUrls: ['./update-delete.component.css'],
  providers: [HomeService, UploadService]
})
export class UpdateDeleteComponent implements OnInit{
  public language:any = Global.initial_language;
  public id:any;
  public url_home:string;
  public home:any = Home;
  public title:string = '';
  /// messaggi vari dei formulari
  public message_datas_success:string = '';
  public message_datas_error:string = '';
  public message_details_error:string = '';
  public message_details_success:string = '';
  public message_avatar_success:string = '';
  public message_avatar_error:string = '';
  public message_images_success:string = '';
  public message_images_error:string = '';
  public message_error_calendary:string = '';
  public message_success_calendary:string = '';
  public message_form:string = this.language.homes_edit.message_field;
  public message_delete:string = '';
  /// gestione menu
  public menu_datas:boolean = false;
  public menu_details:boolean = false;
  public menu_avatar:boolean = false;
  public menu_images:boolean = false;
  public menu_calendary:boolean = false;
  public button_delete:boolean = false;
  /// avatar e immagini
  public avatar:any;
  public images:Array<any> = [];
  /// calendario
  public leap_year:boolean;
  public first_mounth:number = 1;
  public second_mounth:number = 1;
  public total_days_mounth:number = 31;
  public days_january:Array<number> = Calendary.days_january;
  public mounths_names:Array<string> = this.language.mounth_names;
  public current_year:number;
  public year_calendary:number;
  public first_date_price:any;
  public second_date_price:any; 
  public price_value:number = 0;
  @ViewChild ('datas', {static:true}) datas!:ElementRef<HTMLDivElement>;
  @ViewChild ('details', {static:true}) details!:ElementRef<HTMLDivElement>;
  @ViewChild ('avatar', {static:true}) avatar_menu!:ElementRef<HTMLDivElement>;
  @ViewChild ('images', {static:true}) images_menu!:ElementRef<HTMLDivElement>;
  @ViewChild ('calendary', {static:true}) calendary!:ElementRef<HTMLDivElement>;
  @ViewChild ('delete', {static:true}) delete!:ElementRef<HTMLDivElement>;
  @ViewChild ('button_files',{static:true}) button_files!:ElementRef<HTMLButtonElement>;
  @ViewChild ('button_file',{static:true}) button_file!:ElementRef<HTMLButtonElement>;
  //@ViewChild ('button_avatar',{static:true}) button_avatar!:ElementRef<HTMLButtonElement>;


  constructor(
    private _route : ActivatedRoute,
    private _homeService : HomeService,
    private _uploadService : UploadService,
    private _router : Router
  ){
    this.url_home = Global.url_home;
    this.language = Global.setLanguage();
    this.mounths_names = this.language.mounth_names;
    this.message_form = this.language.homes_edit.message_field;
    this.leap_year = Calendary.leap_yearForm();
    this.current_year = new Date().getFullYear();
    this.year_calendary = this.current_year;
  }


  ngOnInit(): void {
    if(!localStorage.getItem('user') || !Global.if_session_admin()){
      this._router.navigate(['']);
    }else{
      this.language = Global.setLanguage();  

      this._route.params.subscribe(param=>{
        this.id = param['id'];
        this.getHome(this.id);        
      })
    }
 }



 getHome(id:string){
  this._homeService.getHome(id).subscribe(response=>{
    this.home = response.home;  
    this.title = this.home.name;   
          console.log(this.home);
          
   Calendary.setCalendaries(this.home.calendary_prices);

    this.showCalendary();
  })
}


/////////////////   menù modifiche  //////////////////


manageMenu(element:any){
  let menu = [this.datas, this.details, this.avatar_menu, this.images_menu, this.calendary, this.delete];
  menu.forEach(el=>{
    if(el == element){
      el.nativeElement.style.cssText = "background-color:rgb(99, 150, 216); color:white;";    
    }else{
      el.nativeElement.style.cssText = "background-color:white; color:black;";
    }
  })
}


menuDatas(){
  this.message_delete = "";
  this.menu_datas = true;
  this.menu_details = false;
  this.menu_avatar = false;
  this.menu_images = false;
  this.menu_calendary = false;
  this.button_delete = false;
  this.manageMenu(this.datas);
}

menuDetail(){
  this.message_delete = "";
  this.menu_datas = false;
  this.menu_details = true;
  this.menu_calendary = false;
  this.menu_avatar = false;
  this.menu_images = false;
  this.button_delete = false;
  this.manageMenu(this.details);
}

menuAvatar(){
  this.message_delete = "";
  this.menu_datas = false;
  this.menu_details = false;
  this.menu_avatar = true;
  this.menu_images = false;
  this.menu_calendary = false;
  this.button_delete = false;
  this.manageMenu(this.avatar_menu);
}

menuImages(){
  this.message_delete = "";
  this.menu_datas = false;
  this.menu_details = false;
  this.menu_avatar = false;
  this.menu_images = true;
  this.menu_calendary = false;
  this.button_delete = false;
  this.manageMenu(this.images_menu);
}

menuCalendary(){
  this.message_delete = "";
  this.menu_datas = false;
  this.menu_details = false;
  this.menu_avatar = false;
  this.menu_images = false;
  this.menu_calendary = true;
  this.button_delete = false;
  this.manageMenu(this.calendary);
}

//////////////////////////////////////////////////////


  update(){
    this.message_datas_success = '';
    this.message_datas_error = '';
    this._homeService.updateDatas(this.id,this.home).subscribe(response=>{
      if(!response){
        this.message_datas_error = this.language.message_error;
      }else{
        this.message_datas_success = this.language.acount.message_datas;
      }
    })
  }



  updateDetails(){
    this.message_details_error = '';
    this.message_details_success = '';
    this._homeService.updateDetails(this.id,this.home).subscribe(response=>{
      if(!response){
        this.message_details_error = this.language.message_error;
      }else{
        this.message_details_success = this.language.homes_edit.detail_success;
      }
    })
  }



  updatePrices(){
    this.message_error_calendary = '';
    this.message_success_calendary = '';
    this._homeService.updatePrices(this.id,this.home).subscribe(response=>{
      if(!response){
        this.message_error_calendary = this.language.message_error;
      }else{
        this.message_success_calendary = this.language.homes_edit.prices_saved;
      }
    })
  }



  changeButtonFile(check:boolean, button:any, number_files:any, message:string, error:string){

    if(!check){
      if(error == 'file'){
        this.message_avatar_error = this.language.acount.message_wrong_file;
      }else{
        this.message_images_error= this.language.acount.message_wrong_file;
      }
    
      button.nativeElement.style.backgroundColor = "rgb(219, 53, 53)";
      button.nativeElement.style.width = "110px";
      button.nativeElement.innerHTML = this.language.acount.choose_file ;    
    }else{
      button.nativeElement.style.backgroundColor = "rgb(99, 150, 216)";
      button.nativeElement.style.width = "160px";
      button.nativeElement.innerHTML = `  <i class="fa fa-file-image-o" aria-hidden="true"></i> ${number_files} ${message}` ;          
    }
  }



  getAvatar(file:any){
    this.message_images_error = '';
    this.avatar = file.target.files[0];   
    let check_type = true;
    if(!Global.type_file(this.avatar.type))   check_type = false; 
    this.changeButtonFile(check_type, this.button_file, '', this.language.acount.selected, 'file');
  }



  getImage(file:any){
    this.message_images_error = '';
    this.images = <Array<File>>file.target.files   
     let check_type = true;

     for(let i=0; i<this.images.length; i++){
       if(!Global.type_file(this.images[i].type)){
        check_type = false;
       }     
     }

     this.changeButtonFile(check_type, this.button_files, this.images.length, this.language.homes_edit.added_images, 'files');
  }


  changeAvatar(){
      this.message_avatar_error = "";
      this.message_avatar_success = '';
      let formData = new FormData();
    if(Global.type_file(this.avatar.type)){      
      formData.set('avatar',this.avatar);
      this._uploadService.upload_homeAvatar(this.home._id , formData).subscribe(response=>{
        if(response){
           this.message_avatar_success = this.language.homes_edit.image_saved;
           this.getHome(this.id);
        }else{
          this.message_avatar_error = this.language.message_error;
        } 
        }) 
    }else{
      this.message_avatar_error = this.language.acount.message_wrong_file;
    }
  }


 
  addImages(){    
    this.message_images_success = '';
    this.message_images_error = '';
    let formData = new FormData();
    for(let i=0; i<this.images.length; i++){
      if(Global.type_file(this.images[i].type)){
        formData.set('images',this.images[i]);
        this._uploadService.upload_homeImages(this.home._id , formData).subscribe(response=>{
          if(response){
            this.message_images_success = this.language.homes_edit.images_saved;
            this.getHome(this.id);
          }else{
            this.message_images_error = this.language.message_error;
          }
            })  
      }else{
        this.message_images_error = this.language.homes_edit.type_error;
      }
    }
  }



  removeImage(image:any){
    this.message_images_success = '';
    this.message_images_error = '';
    if(this.home.images.length > 5){
      this._homeService.delete_image(this.home._id,image).subscribe(response=>{
        if(response){
          this.message_images_success = this.language.homes_edit.delete_image;
          this.getHome(this.id);
        }else{
          this.message_images_error = this.language.message_error;
        }
       }) 

    }else{
      this.message_images_error = this.language.homes_edit.min_images;
    }
    

  }



  buttonDelete(){
    this.message_delete = "";
    this.menu_datas = false;
    this.menu_details = false;
    this.menu_calendary = false;
    this.menu_avatar = false;
    this.menu_images = false;
    this.button_delete = false;

    this.button_delete = true;
    this.manageMenu(this.delete);
  }


  closeButtonDelete(){
    this.button_delete = false;
  }



  deleteHome(){
     if(this.id == "655f6f090ac1c825ba0aeaca" || this.id == "655fb807d1bf0b2ed2c7cb69" || this.id == "6564b3c378766e176383b449"){
       this.message_delete = this.language.homes_edit.impossible_delete;
       this.button_delete = false;
       
     }else{
      this._homeService.delete_home(this.id).subscribe(response=>{
        if(response){
          window.location.href = "http://localhost:4200/acount";
        }
      })
     }
  }


/*         GESTIONE CALENDARIO PREZZI        */
  

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
    console.log(this.home);
    
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
    console.log(this.home);
  }



  showCalendary(){
    let calendaries =  [ this.home.calendary_prices.prices.current_year, this.home.calendary_prices.prices.next_year];
    let calendary = [];
    if(this.year_calendary == this.current_year){
      calendary = calendaries[0];
    }else{
      calendary = calendaries[1];
    }
   
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



  type_price(element:any){
    let result = '';
     if(typeof(element) == 'string'){
       result = "BLOC"
     }else if(typeof(element) == 'number'){
      result = `€${element}`;
     }
     return result;
  }







}
