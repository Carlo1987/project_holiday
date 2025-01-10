import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Home } from 'src/app/models/home/home';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home_sercive';
import { UploadService } from 'src/app/services/upload_service';
import { Calendary } from 'src/app/services/calendary';
import { Global } from 'src/app/services/global';
import { home_beds } from 'src/app/models/home/home_beds';
import { home_details } from 'src/app/models/home/home_details';
import { home_calendary } from 'src/app/models/home/home_calendary';


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
  public url_home:string = Global.url_home;
  public url_front_index:string = Global.url_index_front;
  public home:any =  new Home("","","","",0,0,0,'', home_beds , home_details, home_calendary);
  public homes_length:number = 0;
  public title:string = '';
  public button:string = this.language.homes.edit;
  public admin:boolean = true;

  /// messaggi vari dei formulari
  public message_datas_success:string = '';
  public message_datas_error:string = '';
  public message_details_error:string = '';
  public message_details_success:string = '';
  public message_avatar_success:string = '';
  public message_avatar_error:string = '';
  public message_images_success:string = '';
  public message_images_error:string = '';
  public message_form:string = this.language.homes_edit.message_field;
  public message_delete:string = '';
  public message_calendary:string = this.language.homes_edit.prices_saved;
  public loading:boolean = false;

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



  @ViewChildren('nav_home') nav_elements!: QueryList<ElementRef<HTMLDivElement>>; 

  @ViewChild ('button_files',{static:true}) button_files!:ElementRef<HTMLButtonElement>;
  @ViewChild ('button_file',{static:true}) button_file!:ElementRef<HTMLButtonElement>;




  constructor(
    private _route : ActivatedRoute,
    private _homeService : HomeService,
    private _uploadService : UploadService,
  ){}


  ngOnInit(): void {
      this._route.params.subscribe(param=>{
        this.id = param['id'];
        this.getHome(this.id);        
      })         
 }



 getHome(id:string){
  this._homeService.getHome(id).subscribe(response=>{
    this.home = response.home;  
    this.homes_length = response.homes_length; 
    this.title = this.home.name;   
    
    if(this.title == "Casa Cagliari" || this.title == "Casa Sassari" || this.title == "Casa Oristano"){
      if(this.user.name != "Carlo" && this.user.surname != "Loi"){
        this.admin = false;
       }
    }
                
    Calendary.setCalendaries(this.home.calendary_prices);
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
  this.button_delete.value = false;
}



//////////////////////////////////////////////////////

get_homeDatas(event:any){
  this.home = event.data;
}


  update(){
    this.message_datas_success = '';
    this.message_datas_error = '';
    this.loading = true;
    
    if(this.admin){
      this._homeService.updateDatas(this.id,this.home,this.user.status,this.token).subscribe(response=>{
        if(!response){
          this.message_datas_error = this.language.message_error;
        }else{
          this.message_datas_success = this.language.acount.message_datas;
        }
        this.loading = false;
      })  
    
    }else{
      this.loading = false;
      this.message_datas_error = this.language.homes_edit.no_update;
    }
  }



  updateDetails(event:any){
    this.message_details_error = '';
    this.message_details_success = '';
    this.loading = true;

    this.home.details = event;
  
    if(this.admin){
    this._homeService.updateDetails(this.id,this.home,this.user.status,this.token).subscribe(response=>{
      if(!response){
        this.message_details_error = this.language.message_error;
      }else{
        this.message_details_success = this.language.homes_edit.detail_success;
      }
      this.loading = false;
    }) 
        
    }else{
      this.loading = false;
      this.message_details_error = this.language.homes_edit.no_update;
    }
  }



  updatePrices(event:any){

   this.home = event;
   this.loading = true;

    this._homeService.updatePrices(this.id,this.home,this.user.status,this.token).subscribe(response=>{
      if(!response){
        console.log(this.language.message_error);
  
      }else{
        console.log(this.language.homes_edit.prices_saved);
      }
      this.loading = false;
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
      if(this.admin){
        if(Global.type_file(this.avatar.type)){   
          this.loading = true;   
          formData.set('avatar',this.avatar);
          this._uploadService.upload_homeAvatar(this.home._id , formData,this.token).subscribe(response=>{
            if(response){
               this.message_avatar_success = this.language.homes_edit.image_saved;
               this.getHome(this.id);
            }else{
              this.message_avatar_error = this.language.message_error;
            } 
        this.loading = false;
        }) 
      }else{
        this.message_avatar_error = this.language.acount.message_wrong_file;
      }

    }else{
      this.message_avatar_error = this.language.homes_edit.no_update;
    }
  }


 
  addImages(){    
    this.message_images_success = '';
    this.message_images_error = '';

    if(this.admin){
      let formData = new FormData();
      for(let i=0; i<this.images.length; i++){
        if(Global.type_file(this.images[i].type)){
          this.loading = true;
          formData.set('images',this.images[i]);
          this._uploadService.upload_homeImages(this.home._id , formData,this.token).subscribe(response=>{
            if(response){
              this.message_images_success = this.language.homes_edit.images_saved;
              this.getHome(this.id);
            }else{
              this.message_images_error = this.language.message_error;
            }
            this.loading = false;
              })  
        }else{
          this.message_images_error = this.language.homes_edit.type_error;
        }
      }
    }else{
      this.message_images_error = this.language.homes_edit.no_update;
    }
  }



  removeImage(image:any){
    this.message_images_success = '';
    this.message_images_error = '';

    if(this.admin){
      if(this.home.images.length > 5){
        this.loading = true;
        this._homeService.delete_image(this.home._id,image,this.token).subscribe(response=>{
          if(response){
            this.message_images_success = this.language.homes_edit.delete_image;
            this.getHome(this.id);
          }else{
            this.message_images_error = this.language.message_error;
          }
          this.loading = false;
         }) 
  
      }else{
        this.message_images_error = this.language.homes_edit.min_images;
      }
    }else{
      this.message_images_error = this.language.homes_edit.no_update;
    }

  }




  deleteHome(){
    this.message_delete = '';
    if(this.admin){
     if(this.homes_length <= 3){
       this.message_delete = this.language.homes_edit.impossible_delete;
       this.button_delete = false;
       
     }else{
      this._homeService.delete_home(this.id,this.token).subscribe(response=>{
        if(!response.message){
          window.location.href = this.url_front_index;
        }
      })
     }
    }else{
      this.button_delete = false;
      this.message_delete = this.language.homes_edit.no_update;
    }
  }





  
                  





}
