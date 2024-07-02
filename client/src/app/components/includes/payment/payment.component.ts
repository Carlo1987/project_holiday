import { Component , Input , DoCheck , Output, EventEmitter} from '@angular/core';
import { Global } from 'src/app/services/global';
import { payment_card } from 'src/app/models/reserve/payment_card'; 
import { payment_bank } from 'src/app/models/reserve/bank';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements DoCheck {
  public language:any = Global.setLanguage();
  public payment_method:string = "card";
  public payment_card:any = payment_card;
  public payment_bank:any = payment_bank;
  private data:any = '';
  @Input() getDatas:any;  
  @Output() Payment_Method = new EventEmitter(); 


  ngDoCheck(): void {
    if(this.payment_method == 'card'){
      if(this.payment_card.number != "" && this.payment_card.expiration != "" && this.payment_card.secure_code != "" && this.payment_card.email != ""){
           this.data = this.payment_card;
           this.sendPayment();
      }
    }else if(this.payment_method == 'bank'){
      this.data = this.payment_bank;
       this.sendPayment();       
    }
    
  }



  sendPayment(){
      this.Payment_Method.emit({ 
        method : this.payment_method,
        data : this.data
        })        
  }
}
