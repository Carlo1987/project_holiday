import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [UserService]
})
export class ForgotPasswordComponent implements OnInit{
  public language:any = Global.initial_language;
  public email:string;
  public message_error:string;
  public success:boolean;
  public message_success:string;
  public token:string;
  public reset_password:boolean;
  public new_password:any;
  public session_expired:boolean;

  constructor(
    private _router : Router,
    private _userService : UserService
  ){
    this.email = '';
    this.message_error = '';
    this.success = false;
    this.message_success = '';
    this.token = '';
    this.reset_password = false;
    this.new_password = { password:'' , confirm:'' };
    this.session_expired = false;
  }


  ngOnInit(): void {
    this.language = Global.setLanguage();

    if(localStorage.getItem('token'))    this.success = true;  
  }



  sendEmail(){
    this.message_error = '';
    this.success = false;

    let data = {email : this.email, lang : this.language.language}
      this._userService.forgotPassword(data).subscribe(response=>{

        if(response.message){
           this.message_error = response.message

        }else{
          localStorage.setItem('token', JSON.stringify(response));
          this.success = true;
        }     
   })
  }



  sendToken(){
    this.message_error = '';
    if(localStorage.getItem('token')){
      let data = JSON.parse(localStorage.getItem('token')!);
      let params = {
        token: this.token,
        hash: data.token
      }
      
   this._userService.verifyToken(params).subscribe(response=>{
    if(response.verify){
      this.reset_password = true;
      this.session_expired = false;
      
    }else{
      this.message_error = this.language.resetPassword.error_code;
    }
    
   });

    }else{
      this.session_expired = true;
      this.message_error = this.language.resetPassword.expired_code;
    }
  }



  resetPassword(){
    this.message_error = '';
  
    if(localStorage.getItem('token')){
        if(this.new_password.password != '' && this.new_password.confirm != ''){

        if(this.new_password.password == this.new_password.confirm){

        let data = JSON.parse(localStorage.getItem('token')!);
        let password = {password:this.new_password.password , lang : this.language.language}

        this._userService.resetPassword(data.user._id, password).subscribe(response=>{
              this.session_expired = true;
              this.message_success = response.message;    
              localStorage.removeItem('token');          
        }) 

        }else{
        this.message_error = this.language.acount.message_wrong_confirm;
        }

      }else{
        this.message_error = this.language.resetPassword.empty_field;
      }

      }else{
        this.session_expired = true;
        this.message_error = this.language.resetPassword.expired_code;
      } 
  }






}
