import { Component } from '@angular/core';
import { Global } from 'src/app/services/global';
import { user_reserve } from 'src/app/models/user_reserve';
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


  constructor(
    private _router : Router
  ){}



  edit(){ 
    this.reserve.user_data = this.user;
    let storage = JSON.parse(localStorage.getItem('reserve')!);

    storage.reserve.user_data.name = this.reserve.user_data.name;
    storage.reserve.user_data.surname = this.reserve.user_data.surname;
    storage.reserve.user_data.email = this.reserve.user_data.email;
    storage.reserve.user_data.cell = this.reserve.user_data.cell;
    storage.reserve.user_data.country = this.reserve.user_data.country;
    storage.reserve.user_data.city = this.reserve.user_data.city;
    storage.reserve.user_data.address = this.reserve.user_data.address;
    storage.reserve.user_data.cap = this.reserve.user_data.cap;
 
    storage.expiration = Global.expiration_sessionReserve();

    localStorage.setItem('reserve',JSON.stringify(storage));    

    this._router.navigate(['/reserve']);
  }




  deleteAcount(){}


}




