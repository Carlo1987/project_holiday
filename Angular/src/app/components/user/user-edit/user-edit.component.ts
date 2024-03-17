import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user_service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit{
  public language:any = Global.initial_language;
  public user:any = User;
  public message_form:string = this.language.acount.message_field;
  public message_success:string = '';
  public fileImage:any;

  constructor(
    private _router : Router,
    private _route : ActivatedRoute,
    private _userService : UserService,

  ){}


  ngOnInit(): void {
    if(!localStorage.getItem('user')){
        this._router.navigate(['']);

    }else{
      this._route.params.subscribe(param=>{
        let id = param['id'];
      this.getUser(id);   
      })

      this.language = Global.setLanguage();    
      this.message_form =  this.language.acount.message_field;
    }
  }



  getUser(id:string){
        this._userService.findUser(id).subscribe(response =>{
        this.user = response.user;   
       })
  }



   edit(){
    this.message_success = '';
    
    let user_dates = {
      name : this.user.name,
      surname : this.user.surname,
      email : this.user.email,
      cell : parseInt(this.user.cell),
      address : this.user.address,
      city : this.user.city,
      cap : this.user.cap
    }

    this._userService.updateUser(this.user._id , user_dates).subscribe(
        userEdited =>{     
            this.user = userEdited.user;
            
            let expiration = Global.create_sessionExpitation();
            let data = Global.session_create(userEdited , expiration);
          
            let newSession = JSON.stringify(data);
            localStorage.setItem('user' , newSession);
            this.message_success = this.language.acount.message_datas;
          }
       ) 
    }



  uploadImage(file:any){
    this.fileImage = file.target.files[0];  
    console.log(this.fileImage);
  }



  deleteAcount(){
    this._userService.deleteUser(this.user._id).subscribe(response=>{
       if(response.user){
        window.location.reload();
        localStorage.removeItem('user');  
        this._router.navigate(['']);
       }
   }) 
  }




}
