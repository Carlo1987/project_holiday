import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [UserService]
})
export class ForgotPasswordComponent implements OnInit{
  public language:any = Global.setLanguage();
  public email:string;
  public message_error:string;
  public success:boolean;
  public message_success:string;
  public token:string;
  public reset_password:boolean;
  public new_password:any;
  public session_expired:boolean;

  public loading:boolean = false;

  constructor(
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
    if(localStorage.getItem('code_passw'))    this.success = true;  
  }



  sendEmail(){
    this.message_error = '';
    this.success = false;
    this.loading = true;

    let data = {email : this.email, lang : this.language.language}
      this._userService.forgotPassword(data).subscribe(response=>{

        this.loading = false;  

        if(response.message){
           this.message_error = response.message

        }else{
          let code = {
            token : response.token,
            user : response.user,
            expiration : Global.create_expiration_sessions(10)
          }
          
          localStorage.setItem('code_passw', JSON.stringify(code));
          this.success = true;
        }   
     
   })

  }



  sendToken(){
    this.message_error = '';
    if(localStorage.getItem('code_passw')){
      let data = JSON.parse(localStorage.getItem('code_passw')!);
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
  
    if(localStorage.getItem('code_passw')){

        if(this.new_password.password != '' && this.new_password.confirm != ''){

        if(this.new_password.password == this.new_password.confirm){
          this.loading = true;

        let data = JSON.parse(localStorage.getItem('code_passw')!);
        let password = {password:this.new_password.password , lang : this.language.language}

        this._userService.resetPassword(data.user._id, password).subscribe(response=>{
              this.session_expired = true;
              this.loading = false;
              this.message_success = response.message;    
              localStorage.removeItem('code_passw');          
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
