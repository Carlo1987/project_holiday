import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css'],
  providers: [UserService]
})
export class PasswordEditComponent implements OnInit {
  public language:any = Global.initial_language;
  public message_form:string = this.language.acount.message_field;
  public password:any;
  public session:any;
  public message_wrong_password:string = '';
  public message_success:string = '';


  constructor(
    private _router : Router,
    private _userService : UserService
  ){ }


  ngOnInit(): void {
   if(!localStorage.getItem('user')){
        this._router.navigate(['']);

    } else{
       this.session = JSON.parse(localStorage.getItem('user')!);

      this.password = {
        old_password:'',
        new_password:'',
        confirm_password:''
      }

      this.language = Global.setLanguage();
      this.message_form =  this.language.acount.message_field;
    }
  }



  edit(form:any){
    this.message_success = '';
    this.message_wrong_password = '';
    if(this.password.new_password == this.password.confirm_password){
        let passwords = { 
          old_password: this.password.old_password,
          new_password: this.password.new_password };

        this._userService.updatePassword(this.session.user._id , passwords).subscribe(response=>{

          if(response.update){
            this.message_success = this.language.acount.message_password_success;
          }else{
            this.message_wrong_password = this.language.acount.message_wrong_password;
          }
            
        })
      
    }else{                               //   se le password inserite sono diverse
      this.message_wrong_password = this.language.acount.message_wrong_confirm;
    }
    
     form.reset();
  }

}
