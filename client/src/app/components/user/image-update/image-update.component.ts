import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from 'src/app/services/upload_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-image-update',
  templateUrl: './image-update.component.html',
  styleUrls: ['./image-update.component.css'],
  providers: [UploadService]
})
export class ImageUpdateComponent implements OnInit{
  public language:any = Global.setLanguage();
  public url:string = Global.url_acount;
  public FileImage:any = null;
  public message_wrong_file:string = '';
  public session:any;
  public session_expiration:string = '';
  public update_success:boolean = false;
  public token:string|null = Global.getToken();
  @ViewChild ('buttons_files',{static:true}) buttons_files!:ElementRef<HTMLButtonElement>;


  constructor(
    private _uploadService : UploadService
  ){ }


  ngOnInit(): void {
        this.session = JSON.parse(localStorage.getItem('user')!);
        this.session_expiration = this.session.expiration;
  }



  changeButtonFile(type:string){
    this.message_wrong_file = '';
    if(!Global.type_file(type)){
      this.message_wrong_file = this.language.acount.message_wrong_file;
      this.buttons_files.nativeElement.style.backgroundColor = "rgb(219, 53, 53)";
      this.buttons_files.nativeElement.style.width = "110px";
      this.buttons_files.nativeElement.innerHTML = this.language.acount.choose_file ;    
    }else{
      this.buttons_files.nativeElement.style.backgroundColor = "rgb(99, 150, 216)";
      this.buttons_files.nativeElement.style.width = "160px";
      this.buttons_files.nativeElement.innerHTML = `  <i class="fa fa-file-image-o" aria-hidden="true"></i>  ${this.language.acount.selected}` ;    
    }
  }


  uploadImage(file:any){
      this.FileImage = file.target.files[0];
      this.changeButtonFile(this.FileImage.type);
  }



  edit(){
    this.message_wrong_file = '';
    this.update_success = false;
    if(this.FileImage != null){
      if(Global.type_file(this.FileImage.type)){
        let form = new FormData();
        form.set('image',this.FileImage);
  
        this._uploadService.upload_userImage(this.session.user._id , form).subscribe(response =>{
          
          if(response.message){
             this.message_wrong_file = response.message;
          }else{
            let data = Global.session_create(response , this.session_expiration);
            
            let newSession = JSON.stringify(data);
            localStorage.setItem('user' , newSession);
  
            location.reload(); 
          }
           
        })

      }else{                         //   se il formato dell'immagine è sbagliato
        this.message_wrong_file = this.language.acount.message_wrong_file;     
      }

    }else{                            //   se non invio nessun file
        this.message_wrong_file = this.language.acount.message_empty_file;
    }
  
    
  }

}
