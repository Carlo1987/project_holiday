import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Home } from 'src/app/models/home';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home_sercive';
import { UploadService } from 'src/app/services/upload_service';
import { Calendary } from 'src/app/services/calendary';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.component.html',
  styleUrls: ['./update-delete.component.css'],
  providers: [HomeService, UploadService ]
})
export class UpdateDeleteComponent implements OnInit{

  public language:any = Global.setLanguage();
  public token:string|null = Global.getToken();
  public user:any = Global.getIdentity().user;
  public id:any;
  public url_home:string;
  public url_front_index:string = Global.url_index_front;
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
  public menu_datas:any = { name : "datas" , value : false};
  public menu_details:any = { name : "details" , value : false};
  public menu_avatar:any = { name : "avatar" , value : false};
  public menu_images:any = { name : "images" , value : false};
  public menu_calendary:any = { name : "calendary" , value : false};
  public button_delete:any = { name : "delete" , value : false};
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

  @ViewChildren('nav_home') nav_elements!: QueryList<ElementRef<HTMLDivElement>>; 

  @ViewChild ('button_files',{static:true}) button_files!:ElementRef<HTMLButtonElement>;
  @ViewChild ('button_file',{static:true}) button_file!:ElementRef<HTMLButtonElement>;




  constructor(
    private _route : ActivatedRoute,
    private _homeService : HomeService,
    private _uploadService : UploadService,
  ){
    this.url_home = Global.url_home;
    this.mounths_names = this.language.mounth_names;
    this.message_form = this.language.homes_edit.message_field;
    this.leap_year = Calendary.leap_yearForm();
    this.current_year = new Date().getFullYear();
    this.year_calendary = this.current_year;
  }


  ngOnInit(): void {
      this._route.params.subscribe(param=>{
        this.id = param['id'];
        this.getHome(this.id);        
      })         
 }



 getHome(id:string){
  this._homeService.getHome(id).subscribe(response=>{
    this.home = response.home;  
    this.title = this.home.name;   
                
    Calendary.setCalendaries(this.home.calendary_prices);

    this.showCalendary();
  })
}


/////////////////   nav casa  //////////////////


manageMenu(selected:string){
  let menu = [
    this.menu_datas ,
    this.menu_details,
    this.menu_avatar,
    this.menu_images,
    this.menu_calendary,
    this.button_delete
  ];


  this.nav_elements.forEach((el,i)=>{
    if(menu[i].name == selected){      
      menu[i].value = true;
      el.nativeElement.style.cssText = "background-color:rgb(99, 150, 216); color:white;"; 
      
    } else{      
      menu[i].value = false;
      el.nativeElement.style.cssText = "background-color:white; color:black;";
    } 
    
  })

}



closeButtonDelete(){
  this.button_delete = false;
}



//////////////////////////////////////////////////////


  update(){
    this.message_datas_success = '';
    this.message_datas_error = '';
    this._homeService.updateDatas(this.id,this.home,this.user.status,this.token).subscribe(response=>{
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
    this._homeService.updateDetails(this.id,this.home,this.user.status,this.token).subscribe(response=>{
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
    this._homeService.updatePrices(this.id,this.home,this.user.status,this.token).subscribe(response=>{
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
      this._uploadService.upload_homeAvatar(this.home._id , formData,this.token).subscribe(response=>{
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
        this._uploadService.upload_homeImages(this.home._id , formData,this.token).subscribe(response=>{
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
      this._homeService.delete_image(this.home._id,image,this.token).subscribe(response=>{
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




  deleteHome(){
     if(this.id == "655f6f090ac1c825ba0aeaca" || this.id == "655fb807d1bf0b2ed2c7cb69" || this.id == "6564b3c378766e176383b449"){
       this.message_delete = this.language.homes_edit.impossible_delete;
       this.button_delete = false;
       
     }else{
      this._homeService.delete_home(this.id,this.token).subscribe(response=>{
        if(!response.message){
          window.location.href = this.url_front_index;
        }
      })
     }
  }




/*         GESTIONE CALENDARIO PREZZI        */
  

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

  
  



  showCalendary(){
    let calendaries_prices =  [ this.home.calendary_prices.prices.current_year, this.home.calendary_prices.prices.next_year];
    let calendaries_reserves = [ this.home.calendary_prices.reserves.current_year, this.home.calendary_prices.reserves.next_year];
    let calendary = [];
    let reserves:any = []; 
 

    if(this.year_calendary == this.current_year){
      calendary = calendaries_prices[0];
      reserves = calendaries_reserves[0];
    }else{
      calendary = calendaries_prices[1];
      reserves = calendaries_reserves[1];
    }
    
    let mounths = document.querySelectorAll('.container_mounth');
    mounths.forEach(e=> e.remove());
  
    const container = document.querySelector('.container_mounths');
  
    calendary.forEach((day:any,index:number)=>{      
      let container_day = ``;
 
      for(let i=1; i<=Calendary.total_days_mounth(this.year_calendary)[index]; i++){
        let reserve = reserves[index][i];
        let style_day = '';
        let style_price = '';
        let price = '€'+day[i];

        if(day[i] == 'bloccato') price = `<i class="fa-solid fa-lock" style="color: #dd2727;"></i>`;      //   se questa data risulta bloccata....
 
        if(typeof(reserve) == 'string'){                                                                  //   se in questa data c'è una prenotazione....
          style_day =  "style='background-color:rgb(38, 126, 97);' "     
          style_price = `<div class="reserved"> <p> RESERVED </p>  </div>`;
        }

        container_day += `
         <div class="container_day">
             ${style_price}
           <div class="day"  ${style_day}> <p> ${i} </p> </div>
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
