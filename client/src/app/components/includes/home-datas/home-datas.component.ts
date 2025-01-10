import { Component , DoCheck , Input, Output, EventEmitter  } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-home-datas',
  templateUrl: './home-datas.component.html',
  styleUrls: ['./home-datas.component.css']
})
export class HomeDatasComponent implements DoCheck{
  public language:any = Global.setLanguage();
  public message_form:string = this.language.homes_edit.message_field;
  @Input() home:any;
  @Input() loading:boolean = false;
  @Output() home_datas = new EventEmitter();  


  ngDoCheck(): void {
 
    
    if(this.home.name != '' && this.home.city != '' && this.home.description != ''){
     this.sendData();
    }
    
  }



  sendData(){
    this.home_datas.emit({
      required_fields : true,
      data : this.home
    });  
  }

}
