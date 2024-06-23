import { Component } from '@angular/core';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
  providers: [ UserService ]
})
export class EditRoleComponent{
  ///  messaggi
  public message_error:string = '';
  public message_success:string = '';
  public data:any = {email: '' , role : 'admin'};
  public language:any = Global.setLanguage();
  public token:string|null = Global.getToken();
  public user:any = Global.getIdentity().user;


  constructor(
    private _userService : UserService
  ){}



  editRole(){
    this.message_error = '';
    this.message_success = '';
    if(this.data.email == 'carlo_loi87@yahoo.it'){
      this.message_error = "This user can't be modified";
    }else{
  
       this._userService.editRole(this.data , this.token , this.user.status).subscribe(response=>{
        
        if(response.message){
          this.message_error = response.message;
        }else{
          this.message_success = this.language.admin.manage.role_success;
        }
        
      }) 
    }

   
    
  }

}
