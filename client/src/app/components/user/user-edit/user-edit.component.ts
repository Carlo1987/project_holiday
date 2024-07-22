import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { countries } from 'src/app/models/list_countries';
import { UserService } from 'src/app/services/user_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit{
  public language:any = Global.setLanguage();
  public token:string|null = Global.getToken();
  public user:any = User;
  public countries:Array<any> = countries;
  public fileImage:any;
  public title:string = this.language.acount.title_datas;
  public button:string = this.language.acount.button;
  public delete_acount:boolean = true;

  //  messaggi
  public message_form:string = this.language.acount.message_field;
  public message_error:string = '';
  public message_success:string = '';
  public message_invalidEmail:string = '';
  public loading:boolean = false;


  constructor(
    private _router : Router,
    private _route : ActivatedRoute,
    private _userService : UserService,

  ){}


  ngOnInit(): void {
      this._route.params.subscribe(param=>{
        let id = param['id'];
      this.getUser(id);   
      })

      this.message_form =  this.language.acount.message_field;
  }



  getUser(id:string){
        this._userService.findUser(id).subscribe(response =>{
        this.user = response.user;           
       })
  }



   edit(){
    this.message_error = '';
    this.message_success = '';
    this.message_invalidEmail = '';

    if(Global.validateEmail(this.user.email)){

      this.loading = true;
  
      this._userService.updateUser(this.user._id , this.user , this.token ).subscribe(response =>{ 
        
             if(!response.message){
              this.user = response.user;
              
              let expiration = Global.create_expiration_sessions(60*3);
              let data = Global.session_create(response , expiration);
            
              localStorage.setItem('user' , JSON.stringify(data));
              
              this.message_success = this.language.acount.message_datas;        
  
             }else if(response.message && response.message == 'checked'){
                  this.message_error = this.language.acount.message_checked_email;                
             }else{
              console.log(response.message);
             }

             this.loading = false;
            }) 
    }else{
      this.message_invalidEmail = this.language.notValid_email;
    }
    
 
    }




  deleteAcount(){    
    this._userService.deleteUser(this.user._id , this.token).subscribe(response=>{
       if(response.user){
        window.location.reload();
        localStorage.removeItem('user');  
        localStorage.removeItem('token');
        this._router.navigate(['']);
       }else{
        console.log(response);
        
       }
   }) 
  }




}
