import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Global } from 'src/app/services/global';
import { user_reserve } from 'src/app/models/reserve/user_reserve';
import { countries } from 'src/app/models/list_countries';
import { UserService } from 'src/app/services/user_service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-review-no-login',
  templateUrl: '../../user/user-edit/user-edit.component.html',
  styleUrls: ['./review-no-login.component.css'],
  providers: [ UserService ]
})
export class ReviewNoLoginComponent implements OnInit{
  public language:any = Global.setLanguage();
  public home_id:string = '';
  public title:string = this.language.acount.user_reserve.title_noLogin;
  public button:string = this.language.acount.user_reserve.button_noLogin;
  public delete_acount:boolean = false;
  public user:any = user_reserve;
  public countries:Array<any> = countries;

    //  messaggi
    public message_form:string = this.language.acount.message_field;
    public message_error:string = '';
    public message_success:string = '';
    public message_invalidEmail:string = '';
    public loading:boolean = false;



    constructor(
      private _route : ActivatedRoute,
      private _router : Router,
      private _userService : UserService
    ){}


    ngOnInit(): void {
      this._route.params.subscribe(param=>{
        let home_id = param['id'];
        this.home_id = home_id;
       })
    }



    edit(){ 
      this.message_error = '';
      this.message_success = '';
      this.message_invalidEmail = '';

      if(Global.validateEmail(this.user.email)){
        this.loading = true;
        this.user._id = Global.createID();
        this._userService.findUser_noLogin(this.user).subscribe(response=>{
          if(response.message){
            console.log(response.message);

          }else{

            let data = {
              user_id : response.user._id,
              expiration : Global.create_expiration_sessions(10)
            }
            localStorage.setItem('user_review',JSON.stringify(data));
            this._router.navigate(['create-review/'+this.home_id]); 
          }
          this.loading = false;
        })
   
      }else{
        this.message_invalidEmail = this.language.notValid_email;
      }
    }
  
  
  
  
    deleteAcount(){}
  

}
