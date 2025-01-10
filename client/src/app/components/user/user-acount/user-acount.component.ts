import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { Global } from 'src/app/services/global';
import { countries } from 'src/app/models/list_countries';
import { UserService } from 'src/app/services/user_service';


@Component({
  selector: 'app-user-acount',
  templateUrl: './user-acount.component.html',
  styleUrls: ['./user-acount.component.css'],
  providers: [UserService ]
})
export class UserAcountComponent implements OnInit{
  public language:any = Global.setLanguage();
  public url:string;
  public user:User;
  public countries:Array<any> = countries;
  public message_form:string = this.language.acount.message_field;
  public confirm_password:string = '';
  public message_notValid_email:string = '';
  public message_wrong_email:string = '';
  public message_wrong_password:string = '';
  public message_success_register:string = this.language.acount.message_register;
  public register_success:boolean = false;
  public loading:boolean = false;
  public loading_login:boolean = false;

  public email_login:string = '';
  public password_login:string = '';
  public errors_login:string = '';
  public error_email_login:string = '';
  public User_Logged:any;
  public token:string|null = Global.getToken(); 
  @ViewChild ('buttons_files',{static:true}) buttons_files!:ElementRef<HTMLButtonElement>;

  constructor(
    private _userService: UserService
  ){
    this.url = Global.url_acount;
    this.user = new User("","","","","","Italy","","","");
  }


  ngOnInit(): void {
      this.message_form = this.language.acount.message_field;
      this.message_success_register = this.language.acount.message_register;     
  }


  register(form:any){
    this.message_wrong_password = '';
    this.message_wrong_email = '';
    this.message_notValid_email = '';
    this.register_success = false;

    if(Global.validateEmail(this.user.email)){

    if(this.user.password == this.confirm_password){      

      this.loading = true;

      this._userService.saveUser(this.user).subscribe( userSaved =>{    
        
        if(userSaved.message && userSaved.message == 'checked'){
          this.message_wrong_email = this.language.acount.message_checked_email;
        }else if(userSaved.message){
          console.log(userSaved.message);
        }else{
         this.register_success = true;
          form.reset();
        }

        this.loading = false;
          
        })
       
    }else{                           //  se le password inserite non sono uguali
      this.message_wrong_password = this.language.acount.message_wrong_confirm; 
    } 

   }else{                             //   se l'email inserita non è valida
      this.message_notValid_email = this.language.notValid_email;
   }
  }



  datasUser(data:any,form:any){
    if(data.message && data.message == 'checked'){
      this.message_wrong_email = this.language.acount.message_checked_email;
    }else if(data.message){
      this.register_success = true;
      console.log(data.message);
    }else{
      this.register_success = true;
      form.reset();
      console.log(data.message);
    }
  }



  changeButtonFile(type:string){
    if(!Global.type_file(type)){
      this.buttons_files.nativeElement.style.backgroundColor = "rgb(219, 53, 53)";
      this.buttons_files.nativeElement.style.width = "110px";
      this.buttons_files.nativeElement.innerHTML = this.language.acount.choose_file ;    
    }else{
      this.buttons_files.nativeElement.style.backgroundColor = "rgb(99, 150, 216)";
      this.buttons_files.nativeElement.style.width = "160px";
      this.buttons_files.nativeElement.innerHTML = `  <i class="fa fa-file-image-o" aria-hidden="true"></i>  ${this.language.acount.selected}` ;    
    }
  }





  

  login(form:any){
    this.message_notValid_email = '';
    this.errors_login = '';

    let user = {
      email:this.email_login,
      password: this.password_login
    }
    

    if(user.email != '' && user.password != ''){

      if(Global.validateEmail(user.email)){

        this.loading_login = true;

      this._userService.loginUser(user).subscribe(response =>{      
      
      if(!response.status){
         if(response.message == 'noFound'){
          this.errors_login = this.language.acount.noFoundEmail;                   
         }else if(response.message == 'wrong_pass'){
          this.errors_login = this.language.acount.wrong_password_login;  
         }
      
        }else{
          let token = response.token;

          if(token == null || token == undefined || token == ''){
            this.errors_login = "Error creating the Token";
          
          }else{
             localStorage.setItem('token',JSON.stringify(token));

             this._userService.loginUser(user,true).subscribe(userLogged=>{
              
              let expiration = Global.create_expiration_sessions(60*3);
              let data = Global.session_create(userLogged,expiration);
              
              localStorage.setItem('user' , JSON.stringify(data));  
            
              this.User_Logged = data.user;
  
             window.location.href = '';
             })
          }
        }    
        this.loading_login = false;
    }) 
    form.reset();

    }else{      
      this.error_email_login = this.language.notValid_email;
    }

   }else{
    this.errors_login = this.language.homes.save_alert;  
   }
  }




  

}
