import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
  providers: [ UserService ]
})
export class EditRoleComponent implements OnInit{
  ///  messaggi
  public message_error:string;
  public message_success:string;
  public data:any;


  constructor(
    private _route : Router,
    private _userService : UserService
  ){
    this.message_error = '';
    this.message_success = '';
    this.data = {email: '' , role : 'admin'};
  }


  ngOnInit(): void {
    if(!localStorage.getItem('user') || !Global.if_session_admin()) this._route.navigate(['']);
  }



  editRole(){
    this.message_error = '';
    this.message_success = '';
    if(this.data.email == 'carlo_loi87@yahoo.it'){
      this.message_error = 'Questo utente non può essere modificato';
    }else{
      this._userService.editRole(this.data).subscribe(response=>{
        if(response.message){
          this.message_error = response.message;
        }else{
          this.message_success = 'Ruolo Utente modificato';
        }
        
      })
    }

   
    
  }

}
