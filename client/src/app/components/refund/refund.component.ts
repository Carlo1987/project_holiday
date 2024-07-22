import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendary } from 'src/app/services/calendary';
import { ReserveService } from 'src/app/services/reserve_service';
import { HomeService } from 'src/app/services/home_sercive';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css'],
  providers: [ReserveService, HomeService]
})
export class RefundComponent implements OnInit{
  public language:any = Global.setLanguage();
  public token:string|null = Global.getToken();
  public reserve:any;
  public home_reserve:any;
  public total_refund:boolean = true;
  public refund_value:number = 0;
  public message_error:string = '';
  public message_success:string = '';
  public loading:boolean = false;
  @ViewChild ('show') show_refund!:ElementRef<HTMLDivElement>;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _reserveService : ReserveService,
    private _homeService : HomeService
  ){}


  ngOnInit(): void {
      this._route.params.subscribe(param=>{
        let id = param['id'];
        this.getReserve(id);        
      })    
  }



  getReserve(id:string){
    this._reserveService.getReserve(id).subscribe(response=>{
        this.reserve = response.reserve;
 
        this._homeService.getHome(this.reserve.home_id).subscribe(home=>{
           this.home_reserve = home.home.calendary_prices;
  
           let filter_refund = Calendary.refund_filter(this.reserve.checkIn, this.reserve.checkOut);
           if(!filter_refund.filter || filter_refund.expiration){
             this._router.navigate(['']);
           }else{          
             if(!Calendary.check_refund(this.reserve.refund.limit)){
               this.total_refund = false;               
             }
            this.show(this.total_refund, this.reserve);
           }
        })
    })
  }



  show(total_refund:boolean, reserve:any){
       let refund = "";
       if(total_refund){
         if(reserve.advance.set == 'false'){
          this.refund_value = reserve.cost.final_cost;
           refund =  `${this.language.refund_reserve.message1} €${this.refund_value}`;
         }else{
          this.refund_value = reserve.advance.value_advance;
          refund = `${this.language.refund_reserve.message3} €${this.refund_value}`;
         }
       }else{
        if(reserve.advance.set == 'false'){
          this.refund_value = (reserve.cost.final_cost/2);
          refund =  `${this.language.refund_reserve.message2} €${this.refund_value}`;
        }else{
        this.refund_value = reserve.advance.value_advance/2;
         refund = `${this.language.refund_reserve.message4} €${this.refund_value}`;
        }
       }

        let html = `
            <p> ${refund} </p>
         `;

        this.show_refund!.nativeElement.insertAdjacentHTML('afterbegin',html);
  }



  refund(){    
    this.message_error = '';
    this.message_success = '';
    if(this.reserve.status == "prenotata"){

      this.loading = true;

      let calendary_home = Calendary.refund(this.home_reserve,this.reserve.checkIn, this.reserve.checkOut);
     
      let data = {
        calendary_home : calendary_home,
        total_refund : this.total_refund,
        refund_value : this.refund_value,
        lang : this.language.language
      }
        
          this._reserveService.refund(this.reserve._id, data ).subscribe(response=>{
          if(response.reserve && response.home){
            this.reserve.status = "annullata";
             this.message_success = this.language.refund_reserve.success;
          }else{
            console.log(response);
            
          }
          this.loading = false;
       })     

    }else{
      this.message_error = this.language.refund_reserve.checked_refund;
    } 
 
    
  }








}
