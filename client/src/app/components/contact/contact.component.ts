import { Component } from '@angular/core';
import { Global } from 'src/app/services/global';
import { ExtraService } from 'src/app/services/extra_service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ ExtraService ]
})
export class ContactComponent {
  public language:any = Global.setLanguage();
  public contact:any;
  public message_error:string = '';
  public message_success:string = '';
  public loading:boolean = false;


  constructor(
    private _extraService : ExtraService
  ){
    this.contact = {
      email : "",
      object : "",
      message : ""
    }
  }




  send(){
    this.message_error = '';
    this.message_success = '';

    if(this.contact.email != '' && this.contact.object != '' && this.contact.message != ''){

      let validate_email = Global.validateEmail(this.contact.email);
      if(validate_email){
        this.loading = true;
        this._extraService.contact(this.contact).subscribe(response=>{
           
           if(response.message.status == 'error'){
            this.message_error = response.message.text;
           }else if(response.message.status == 'success'){
             this.message_success = this.language.sendEmail;
           }

           this.loading = false;
           this.contact = {
            email : "",
            object : "",
            message : ""
          }
        })
      }else{
        this.message_error = this.language.notValid_email;
      }
     

    }else{
      this.message_error = this.language.empty_fields;
    }
   
    
  }

}
