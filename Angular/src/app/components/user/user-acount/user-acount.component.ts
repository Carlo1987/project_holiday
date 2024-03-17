import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user_service';
import { UploadService } from 'src/app/services/upload_service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-acount',
  templateUrl: './user-acount.component.html',
  styleUrls: ['./user-acount.component.css'],
  providers: [UserService , UploadService]
})
export class UserAcountComponent implements OnInit{
  public language:any = Global.initial_language;
  public url:string;
  public user:User;
  public message_form:string = this.language.acount.message_field;
  public confirm_password:string = '';
  public message_wrong_password:string = '';
  public message_wrong_email:string = '';
  public message_wrong_file:string = '';
  public message_success_register:string = this.language.acount.message_register;
  public register_success:boolean = false;
  public fileImage:any = '';
  public email_login:string = '';
  public password_login:string = '';
  public errors_login:string = '';
  public User_Logged:any;
  @ViewChild ('buttons_files',{static:true}) buttons_files!:ElementRef<HTMLButtonElement>;

  constructor(
    private _userService: UserService,
    private _uploadService : UploadService,
    private _router : Router
  ){
    this.url = Global.url_acount;
    this.user = new User("","","","","","","","");
  }


  ngOnInit(): void {
    if(localStorage.getItem('user')){              //  se l'utente è loggato
       this._router.navigate(['']);
    }else{
      this.language = Global.setLanguage();
      this.message_form = this.language.acount.message_field;
      this.message_success_register = this.language.acount.message_register;     
    }
  }


  register(form:any){
    this.message_wrong_password = '';
    this.message_wrong_email = '';
    if(this.user.password == this.confirm_password){

      this._userService.saveUser(this.user).subscribe(
        userRegister =>{     

          if(this.fileImage != ''){
            let formData = new FormData();
            formData.set('image',this.fileImage);
            
            this._uploadService.upload_userImage(userRegister.user._id , formData)
            .subscribe((response)=>{
            
              if(userRegister.message && userRegister.message == 'checked'){
                this.message_wrong_email = this.language.acount.message_checked_email;
              }else{
                this.register_success = true;
              }
             form.reset();
            })

          }else{                            //   se non viene inviato il file immagine, verrà messa l'immagine di default tramite backend
            this.register_success = true;
            form.reset();
          }
          
        }
       )
      
    }else{                           //  se le password inserite non sono uguali
      this.message_wrong_password = this.language.acount.message_wrong_confirm; 
    } 
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
    this.fileImage = file.target.files[0];  
    this.changeButtonFile(this.fileImage.type);   
  }



  login(form:any){

    let user = {
      email:this.email_login,
      password: this.password_login
    }

    this._userService.loginUser(user).subscribe(response =>{
      
      if(response.message){
         if(response.message == 'noFound'){
          this.errors_login = this.language.acount.noFoundEmail;                   
         }else if(response.message == 'wrong_pass'){
          this.errors_login = this.language.acount.wrong_password_login;  
         }
      }    

      let expiration = Global.create_sessionExpitation();
      let data = Global.session_create(response,expiration);
      
      localStorage.setItem('user' , JSON.stringify(data));  
    
      this.User_Logged = data.user;
      window.location.href = `http://localhost:4200`;
    }) 
    form.reset();
  }




  

}
