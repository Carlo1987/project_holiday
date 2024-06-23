import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveService } from 'src/app/services/reserve_service';
import { HomeService } from 'src/app/services/home_sercive';
import { Calendary } from 'src/app/services/calendary';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-user-reserve',
  templateUrl: './user-reserve.component.html',
  styleUrls: ['./user-reserve.component.css'],
  providers: [ReserveService, HomeService]
})
export class UserReserveComponent implements OnInit{
  public url_back:string = Global.url_home;
  public url_front:string = Global.url_index_front;
  public language:any = Global.setLanguage();
  public Calendary:any = Calendary
public reserves:Array<any> = [];
public check_reserve:boolean = false;
public total_reserves:number = 0;
public reserves_refused:number = 0;
public reserves_confirmed:number = 0;
public token:string|null = Global.getToken();

@ViewChild ('reserves') reserves_div!:ElementRef<HTMLDivElement>;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _reserveService : ReserveService,
    private _homeService : HomeService
  ){}


  ngOnInit(): void {
      this._route.params.subscribe(param=>{
        let id = param['id'];     
        this.getUserReserve(id);
      })
  }



  getUserReserve(id:string){
      this._reserveService.getReserve_byUser(id,this.token).subscribe(response=>{
   
        if(response.message){
          console.log(response.message);
          
        }else{
            
          this.reserves = response.reserve;
          if(this.reserves.length != 0){
            
            this.check_reserve = true;      
            this.total_reserves = this.reserves.length;  
          
      
            this._homeService.getHomes().subscribe(response=>{
          
              let homes = response.homes;
              
       
               this.reserves.forEach((reserve,index)=>{
               this.getHome(reserve,index,homes);

               if(reserve.status == "prenotata"){
                 this.reserves_confirmed++;
               }else{
                this.reserves_refused++;
               }
              })     
            })
            
          }
        }
      })
  }



  getHome(reserve:any, index:number,homes:Array<any>){
    homes.forEach(home=>{
      if(home._id == reserve.home_id){
        
        this.showReserves(reserve, index, home);       
      }
    })
  }
  

  
  showReserves(reserve:any, index:number, home:any){
     let button = `<div class="text-danger" style="font-weight:bold;"> ${this.language.acount.user_reserve.rejected} ${reserve.refund.date}  </div> `; 

      let filter_refund = Calendary.refund_filter(reserve.checkIn, reserve.checkOut);

        let money = '€'+(reserve.cost.final_cost).toFixed(2);

        let status = `<span style='color:green; font-weight: bold;'> ${this.language.acount.user_reserve.complete_payment} </span>`; 

        if(reserve.status == "annullata"){                                        //   rimborso in caso di annullamento
          status = `<span style='color:red; font-weight: bold;'> ${this.language.reserves.refund}: €${(reserve.refund.value).toFixed(2)} </span>`;
        }

        /*    regolo i diversi tipi di tabelle   */
         let payment = `
          <table border="2px">
          <tr>
              <th> ${this.language.acount.user_reserve.cost} </th>
              <th> ${this.language.acount.user_reserve.status} </th>
          </tr>
          <tr>
             <td> ${money} </td>
             <td> ${status} </td>
          </tr>
          </table>`;

          let complete_payment = '';        
      
          if(reserve.advance.set == 'true' && reserve.status == "prenotata"){
           payment = `
           <table border="2px">
           <tr>
               <th> ${this.language.acount.user_reserve.cost} </th>
               <th> ${this.language.acount.user_reserve.advanced} </th>
               <th> ${this.language.acount.user_reserve.debt_1} </th>
           </tr>
           <tr>
              <td> €${(reserve.cost.final_cost).toFixed(2)} </td>
              <td>€${(reserve.advance.value_advance).toFixed(2)} </td>
              <td> €${(reserve.advance.rest_advance).toFixed(2)} </td>
           </tr>
          </table>`

          complete_payment = ` <li class="text-center"><a class="dropdown-item button_completePayment" href="${this.url_front}/reserve-complete/${reserve._id}"> <strong> ${this.language.acount.user_reserve.debt_2} </strong> </a></li>`

          }   

          /*    in caso di prenotazione regolare, regolo i diversi tipi di bottoni    */
          if(reserve.status == "prenotata"){

              if(filter_refund.filter){
                button = ` 
                <div class="dropdown">
                    <button class="btn dropdown-toggle" style='background-color:rgb(38, 126, 97); color:white;'  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${this.language.acount.user_reserve.manage}
                   </button>
                  <ul class="dropdown-menu">
                     ${complete_payment}
                     <li class="text-center"><a class="dropdown-item button_refund" href="${this.url_front}/refund/${reserve._id}"> <strong> ${this.language.delete} </strong> </a></li>
                  </ul>
                  </div> `;
              }else{
  
                button = `<p class="text-success"> <strong>  ${this.language.progress} </strong> </p> `;

                if(filter_refund.expiration){
       
                  button = `<p class="text-success"> <strong> ${this.language.acount.user_reserve.ended} </strong> </p> `;
                }
              } 
          }


    let  date_refund = `<div> ${this.language.acount.user_reserve.refund} ${reserve.refund.limit} </div>`;

    let dates = function(date:string){
       let dateSplit = date.split('-');
       return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
    }

 
     let html = `
      <div class="block">
        <div class="row">
          <div class="col-sm-7">
             <p> <strong>  ${index+1})   
                 <span style='text-transform:uppercase; font-size:20px;'>  ${home.name}</span> </strong>  
                 <img src="${this.url_back}/get_avatar/${home.avatar}" style="width:60px; height;40px; border-radius:5px; border:1px solid black; margin-left:3px;">
              </p>
          </div>
          <div class="col-sm-5">
             <div class="w-100 text-sm-end pt-1">  ${button}  </div> 
          </div>
        </div>
   
 
        <div class="w-100 d-flex flex-sm-row flex-column align-items-center position-relative"> 
              <span class="ms-0"> ${date_refund} </span> 
              <span class="me-0"> ${this.modalReserve(reserve)} </span>  
        </div>

        ${payment} 
     
        <table border="2px" style="margin-top:15px;">
           <tr>
               <th> Check-In </th>
               <th> Check-Out </th>
               <th> N° ${this.language.nights} </th>
             
           </tr>
           <tr>
              <td> ${dates(reserve.checkIn)} </td>
              <td> ${dates(reserve.checkOut)} </td>
              <td> ${reserve.total_nights} </td>
             
           </tr>
        </table>

        <div class="w-100 btn btn-link tect-center modal_text paymentClien"> 
             <a href="${this.url_front}/reserve-single/${reserve._id}">  Mostra dettagli  <i class="fa fa-arrow-down fa-2xs" aria-hidden="true"></i>  </a>
        </div>
      </div>
    `;  

    this.reserves_div!.nativeElement.insertAdjacentHTML('beforeend',html);
}




modalReserve(reserve:any){

let paymets = `<p> <span class="payment_good"> ${this.language.complete_payment.paid}: </span> <strong> €${reserve.cost.final_cost.toFixed(2)} </strong> con ${this.typePayment(reserve.payment[0].type)} il ${reserve.payment[0].hour} </p>`;
let refund = "";


  if(reserve.payment.length == 1 && reserve.advance.set == 'true'){
    paymets = `
   <p> <span class="payment_good"> ${this.language.complete_payment.advance}: </span> <strong> €${reserve.advance.value_advance.toFixed(2)} </strong> con ${this.typePayment(reserve.payment[0].type)} il ${reserve.payment[0].hour} </p>
     
   <p>  <span class="payment_bad"> ${this.language.complete_payment.to_pay}: </span> <strong>€${reserve.advance.rest_advance.toFixed(2)} </strong> </p>` 

  }else if(reserve.payment.length == 2){
      paymets = `
      <p> <span class="payment_good">   ${this.language.complete_payment.advance}:  </span> <strong>€${reserve.advance.value_advance.toFixed(2)} </strong> con ${this.typePayment(reserve.payment[0].type)} il ${reserve.payment[0].hour}  </p>
       
       <p> <span class="payment_good">   ${this.language.complete_payment.pay_end}: </span> <strong> €${reserve.advance.rest_advance.toFixed(2)} </strong> con ${this.typePayment(reserve.payment[1].type)} il ${reserve.payment[1].hour} </p>
      `
  } 


  if(reserve.status == 'annullata'){
    refund = ` <hr> <p> <span class="payment_bad"> ${this.language.reserves.refund}: </span> <strong> €${reserve.refund.value.toFixed(2)} </strong> il ${reserve.refund.date} alle ${Calendary.adapt_hour(reserve.refund.hour)} </p>`;
  }

 return `
 <button type="button" class="btn btn-link modal_text paymentClient">
      ${this.language.payments}  <i class="fa fa-arrow-down fa-2xs" aria-hidden="true"></i> 
      
     <div class="modal_payments modalClient">  

       <h3 class="w-100 text-center"> ${this.language.complete_payment.payments} </h3>
  
       ${paymets}
   
      <p> ${refund} </p>

     </div>

   </button>
`
}






typePayment(type:string){
  let payment = "bonifico";
  if(type == 'card'){
      payment = "carta di debito";
  }
  return payment;
}













}
