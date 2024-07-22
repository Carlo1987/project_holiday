import { Component , Input , Output, EventEmitter } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.css']
})
export class HomeDetailsComponent {
  public language:any = Global.setLanguage();
  @Input() home:any;
  @Input() button:any;
  @Input() loading:boolean = false;
  @Output() home_details = new EventEmitter();  


  sendData(){
    this.home_details.emit(this.home.details);  
  }

}
