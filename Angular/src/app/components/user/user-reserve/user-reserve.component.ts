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
  public language:any = Global.initial_language;
public reserves:Array<any> = [];
public check_reserve:boolean = false;
public total_reserves:number = 0;
public reserves_refused:number = 0;
public reserves_confirmed:number = 0;
@ViewChild ('reserves') reserves_div!:ElementRef<HTMLDivElement>;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _reserveService : ReserveService,
    private _homeService : HomeService
  ){}


  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this._route.params.subscribe(param=>{
        let id = param['id'];     
        this.getUserReserve(id);
      })
 
      this.language = Global.setLanguage();

    }else{
      this._router.navigate(['']);
    }
  }



  getUserReserve(id:string){
      this._reserveService.getReserve_byUser(id).subscribe(response=>{
       this.reserves = response.reserve;
       console.log(this.reserves);
       
       
      if(this.reserves.length != 0){
        this.check_reserve = true;      
        this.total_reserves = this.reserves.length;  
        this.reserves.forEach((reserve,index)=>{
           this.getHome(reserve,index); 

           if(reserve.status == "prenotata"){
             this.reserves_confirmed++;
           }else{
            this.reserves_refused++;
           }
        })        
       }
      })
  }


  
  
  showReserves(reserve:any, index:number, home_name:string){
      let button = `<button type="button" class="btn btn-danger" disabled> ${this.language.acount.user_reserve.rejected} </button> `;    //   bottono se la prenotazione è annullata
   
      let filter_refund = Calendary.refund_filter(reserve.checkIn, reserve.checkOut);

        let date_refund = '';

        let money = (reserve.cost.final_cost).toFixed(2);

        let status = `${this.language.acount.user_reserve.complete_payment}`;

        if(reserve.status == "annullata"){                                        //   rimborso in caso di annullamento
      
          if(!Calendary.check_refund(reserve.refund.date)){
            if(reserve.advance.set == 'false'){
              money = reserve.cost.final_cost.toFixed(2);
              status = `${this.language.reserves.refund}: €${(reserve.cost.final_cost/2).toFixed(2)}`;
            }else{
              money = reserve.advance.value_advance.toFixed(2);
              status = `${this.language.reserves.refund}: €${(reserve.advance.value_advance/2).toFixed(2)}`;
            }
          }else{
            if(reserve.advance.set == 'false'){
              money = reserve.cost.final_cost.toFixed(2);
              status = `${this.language.reserves.refund}: €${reserve.cost.final_cost.toFixed(2)}`;
            }else{
              money = reserve.advance.value_advance.toFixed(2);
              status = `${this.language.reserves.refund}: €${reserve.advance.value_advance.toFixed(2)}`;
            }
          }
        }

        /*    regolo i diversi tipi di tabelle   */
         let payment = `
          <table border="2px">
          <tr>
              <th> ${this.language.acount.user_reserve.cost} </th>
              <th> ${this.language.acount.user_reserve.status} </th>
          </tr>
          <tr>
             <td> €${money} </td>
             <td style='color:green; font-weight: bold;'> ${status} </td>
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

          complete_payment = ` <li class="text-center"><a class="dropdown-item button_completePayment" href="http://localhost:4200/reserve-complete/${reserve._id}"> ${this.language.acount.user_reserve.debt_2} </a></li>`

          }   

          /*    in caso di prenotazione regolare, regolo i diversi tipi di bottoni    */
          if(reserve.status == "prenotata"){

            date_refund = `<p> ${this.language.acount.user_reserve.refund} ${reserve.refund.date} </p>`;

              if(filter_refund.filter){
                button = ` 
                <div class="dropdown">
                    <button class="btn dropdown-toggle" style='background-color:rgb(38, 126, 97); color:white;'  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${this.language.acount.user_reserve.manage}
                   </button>
                  <ul class="dropdown-menu">
                     ${complete_payment}
                     <li class="text-center"><a class="dropdown-item button_refund" href="http://localhost:4200/refund/${reserve._id}"> ${this.language.delete} </a></li>
                  </ul>
                  </div> `;
              }else{
                date_refund = '';
                button = `<button type="button" class="btn"  style='background-color:rgb(38, 126, 97); color:white;' disabled>  ${this.language.progress} </button> `;

                if(filter_refund.expiration){
                  date_refund = '';
                  button = `<button type="button" class="btn"  style='background-color:rgb(38, 126, 97); color:white;' disabled>  ${this.language.acount.user_reserve.ended} </button> `;
                }
              } 
          }

       
    let dates = function(date:string){
       let dateSplit = date.split('-');
       return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
    }
 
     let html = `
      <div class="block">
      <p>  ${index+1}) <strong> ${this.language.reserve} ${this.language.for} <span style='text-transform:uppercase; font-size:20px;'>${home_name}</span> </strong>  </p>
      ${date_refund} 
      ${payment} 
     
        <table border="2px" style="margin-top:15px;">
           <tr>
               <th> Check-In </th>
               <th> Check-Out </th>
               <th> N° ${this.language.nights} </th>
               <th> ${this.language.reserve} </th>
           </tr>
           <tr>
              <td> ${dates(reserve.checkIn)} </td>
              <td> ${dates(reserve.checkOut)} </td>
              <td> ${reserve.total_nights} </td>
              <td>${button} </td>
           </tr>
        </table>
      </div>
    `;  

    this.reserves_div!.nativeElement.insertAdjacentHTML('beforeend',html);
}


  getHome(reserve:any, index:number){
    this._homeService.getHome(reserve.home_id).subscribe(response=>{
          this.showReserves(reserve, index, response.home.name); 
    })
  }











}
