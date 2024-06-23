import { Component } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Router } from '@angular/router';
import { ReserveService } from 'src/app/services/reserve_service';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-search-reserve',
  templateUrl: './search-reserve.component.html',
  styleUrls: ['./search-reserve.component.css'],
  providers: [ ReserveService , UserService ]
})
export class SearchReserveComponent {

  public language:any = Global.setLanguage();
  public reserve_id:string = '';
  public message_error:string = '';
  public message_error_code:string = '';
  public verify:boolean = false;
  public code_value:string = '';


  constructor(
    private _reserveService : ReserveService,
    private _userService : UserService,
    private _router : Router
  ){}



  search(){
    this.message_error = '';
    this.message_error_code = '';
     this._reserveService.getReserve(this.reserve_id).subscribe(response=>{
      if(response.message){
        this.message_error = this.language.reserves.search_error;
        
      }else{
        this.verify = true;
       let data = {email : response.reserve.user_data.email, lang : this.language.language}
        

        this._userService.forgotPassword(data).subscribe(response=>{

            localStorage.setItem('code_passw', JSON.stringify(response));
          
        }) 
       
      }      
     })    
  }


  
  code(){
    this.message_error = '';
    this.message_error_code = '';

    if(localStorage.getItem('code_passw')){
      let data = JSON.parse(localStorage.getItem('code_passw')!);
      let params = {
        token: this.code_value,
        hash: data.token
      }
            
      this._userService.verifyToken(params).subscribe(response=>{
        if(response.verify){
           this._router.navigate(["reserve-single/"+this.reserve_id]);  
        }else{
        this.message_error_code = this.language.resetPassword.error_code;
        }
      })
    
    }else{
      this.message_error_code = this.language.resetPassword.expired_code;
    }

 
  }



}
