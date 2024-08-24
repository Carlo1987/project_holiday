import { Component } from '@angular/core';
import { Global } from 'src/app/services/global';
import { user_reserve } from 'src/app/models/reserve/user_reserve';
import { countries } from 'src/app/models/list_countries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve-no-login',
  templateUrl: '../../user/user-edit/user-edit.component.html',
  styleUrls: ['./reserve-no-login.component.css']
})
export class ReserveNoLoginComponent {
  public language:any = Global.setLanguage();
  public user:any = user_reserve;
  public countries:Array<any> = countries;
  public title:string = this.language.acount.user_reserve.title_noLogin;
  public button:string = this.language.acount.user_reserve.button_noLogin;
  public delete_acount:boolean = false;
  public reserve:any = JSON.parse(localStorage.getItem('reserve')!).reserve;
  
  //  messaggi
  public message_form:string = this.language.acount.message_field;
  public message_error:string = '';
  public message_success:string = '';
  public message_invalidEmail:string = '';
  public loading:boolean = false;


  constructor(
    private _router : Router
  ){}



  edit(){ 
    this.message_error = '';
    this.message_invalidEmail = '';
    this.message_success = '';

    if(Global.validateEmail(this.user.email)){
      this.loading = true;
      this.reserve.user_data = this.user;
      let storage = JSON.parse(localStorage.getItem('reserve')!);

      storage.reserve.user_data = this.reserve.user_data;
      storage.expiration = Global.create_expiration_sessions(10);
  
      localStorage.setItem('reserve',JSON.stringify(storage));    
      this.loading = false;
  
      this._router.navigate(['/reserve']);

    }else{
      this.message_invalidEmail = this.language.notValid_email;
    }
   
  }




  deleteAcount(){}


}




