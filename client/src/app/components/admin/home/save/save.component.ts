import { Component, ViewChild, ElementRef} from '@angular/core';
import { Home } from 'src/app/models/home/home';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { HomeService } from 'src/app/services/home_sercive';
import { UploadService } from 'src/app/services/upload_service';
import { home_details } from 'src/app/models/home/home_details';
import { home_beds } from 'src/app/models/home/home_beds';
import { home_calendary } from 'src/app/models/home/home_calendary';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css'],
  providers: [HomeService , UploadService]
})
export class SaveComponent {
  public language:any = Global.setLanguage();
  public token:string|null = Global.getToken();
  public user:any = Global.getIdentity().user;
  public required_fields:boolean = false;
  public button:string = this.language.continue;
  public admin:boolean = true;

  //  messaggi
  public message_success:string = '';
  public message_error_image:string = '';
  public message_calendary:string = this.language.homes.saved
  public loading:boolean = false;

  //  dati casa
  public home:any = new Home("","","","",0,0,0,'', home_beds , home_details, home_calendary);
  public avatar:any;
  public images:Array<any> = [];

  //  formulari
  public title_form:string = this.language.homes.title_save;  /////
  public datas_form:boolean = true;
  public details_form:boolean = false;
  public prices_form:boolean = false;


  @ViewChild ('buttons_files',{static:true}) buttons_files!:ElementRef<HTMLButtonElement>;
  @ViewChild ('button_files',{static:true}) button_files!:ElementRef<HTMLButtonElement>;


  constructor(
    private _homeService : HomeService,
    private _uploadService : UploadService,
  ){}




  save(event:any){

    this.home = event;
    this.loading = true;    
    
       ////  dati casa  ////    
     this._homeService.saveHome(this.home,this.user.status,this.token).subscribe(dataSaved=>{   
      
       if(dataSaved.message){
         console.log(dataSaved.message);
    
       }else{
        let formData = new FormData(); 

        if(this.avatar != ''){
             //// immagine avatar/sfondo della casa ////
          formData.set('avatar', this.avatar);
          this._uploadService.upload_homeAvatar(dataSaved.home._id , formData , this.token).subscribe(response =>{
          console.log(response);     }); 
        }
      
        ////  immagini della casa  ////
            for(let i=0; i<this.images.length; i++){
              formData.set('images',this.images[i]);
              this._uploadService.upload_homeImages(dataSaved.home._id , formData, this.token).subscribe(response=>{
              console.log(response); 
                })        
            } 

       }
       this.loading = false;
    })   

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


  get_homeDatas(event:any){
      this.home = event.data;
      this.required_fields = event.required_fields;
      
  }


  detailsForm(){ 
      this.message_error_image = '';
      if(this.images.length >= 5 && this.required_fields){
        this.datas_form = false;
        this.details_form = true;
        this.title_form = this.language.homes.details.title;
        
      }else{
        this.buttonWrongFormat(this.buttons_files);
        this.message_error_image = this.language.homes.min_images;
      }
     
  }


  pricesForm(event:any){
    this.home.details = event;   
      
    this.details_form = false;
    this.details_form = false;
    this.prices_form = true;
    this.title_form = this.language.homes.pricce_title;
  }


}
