import { Component, OnInit, ElementRef } from '@angular/core';
import { ExtraService } from 'src/app/services/extra_service';
import { Global } from 'src/app/services/global';
import { extra } from 'src/app/models/extra';


@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css'],
  providers: [ExtraService]
})
export class InstrumentsComponent implements OnInit{
  public language:any = Global.setLanguage();
  public current_year:number = new Date().getFullYear();
  public extra:any = extra;
  public min_reserve_days:Array<number> = [1,2,3,4,5];;
  public max_reserve_days:Array<number> = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  public limit_mouthReserve:Array<number> = [8,9,10,11,12];
  public hours:Array<number> = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  public token:string|null = Global.getToken();
  public user:any = Global.getIdentity().user;
  /// messaggi
  public message_error:string = '';
  public message_success:string = '';
  public loading:boolean = false;


  constructor(
    private _EL : ElementRef,
    private _extraService : ExtraService
  ){}


  ngOnInit(): void {
      this.accordion();
      this.getExtra();
  }



  accordion(){
    const modes = this._EL.nativeElement.querySelectorAll('.refund_title');
    const texts = this._EL.nativeElement.querySelectorAll('.refund_text');

 modes.forEach((mode:any, index:number)=> 
   mode.addEventListener('click',()=>{
    for(let i=0; i<texts.length; i++){
      if(i!=index){
        modes[i].style.backgroundColor = "white";
        texts[i].style.display = 'none';
      }else{
        modes[i].style.backgroundColor = "rgb(242, 234, 234)";
        texts[i].style.cssText = "display:block; border-left:1px solid black; border-right:1px solid black; border-bottom:1px solid black;border-radius:10px;"
      } 
    }
   })  
 )}



 getExtra(){
  this._extraService.getExtra().subscribe(response=>{
    this.extra = response.extra;  
  })
 }



  updateExtra(){
    this.message_error = '';
    this.message_success = '';
    this.loading = true;
  
    if(this.extra.refund.mode == 'flexible'){
        this.extra.refund.days = 1;
    }else  if(this.extra.refund.mode == 'moderate'){
      this.extra.refund.days = 5;
    }else if(this.extra.refund.mode == 'rigid'){
      this.extra.refund.days = 14
    }    

   this._extraService.update(this.extra,this.user.status,this.token).subscribe(response=>{
     if(response.message){
       this.message_error = this.language.admin.manage.message_error
     }else if(response.extra){
      this.message_success = this.language.admin.manage.message_success;
     }
     this.loading = false;
    })  
  }




}
