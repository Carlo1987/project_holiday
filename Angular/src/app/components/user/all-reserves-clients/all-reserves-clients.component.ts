import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/global';
import { Calendary } from 'src/app/services/calendary';
import { ReserveService } from 'src/app/services/reserve_service';
import { HomeService } from 'src/app/services/home_sercive';

@Component({
  selector: 'app-all-reserves-clients',
  templateUrl: './all-reserves-clients.component.html',
  styleUrls: ['./all-reserves-clients.component.css'],
  providers: [ReserveService, HomeService]
})
export class AllReservesClientsComponent implements OnInit{
  public language:any = Global.initial_language;
  public current_year:number = new Date().getFullYear();
  public mounths:Array<string> = Calendary.mounth_names();
  public mounths_reserves_currentYear:Array<any> = Calendary.sort_reserves();
  public mounths_reserves_nextYear:Array<any> = Calendary.sort_reserves();
  public reserves:Array<any> = [];
  public homes:Array<any> = [];
  public selected_home:string = '#';
  public chosed_mounth:string = '#';
  public chosed_year:string = '#'; 
  public selected_year:number = 0;
  public selected_mounth_reserve:Array<any> = [];
  public home_name:string = "";
  public counter_reservesConfirmed:number = 0;
  public counter_reservesRefused:number = 0;
  public message_general:string = this.language.admin.client_reserves.select;
  public message_error:string = '';



  constructor(
    private _router : Router,
    private _reserveService : ReserveService,
    private _homeService : HomeService
  ){}


  ngOnInit(): void {
    if(!localStorage.getItem('user') || !Global.if_session_admin()){
      this._router.navigate(['']);
    
    }else{
      this.getHomes();    
      this.language = Global.setLanguage();  
      this.message_general= this.language.admin.client_reserves.select;
    }
  }


  getHomes(){
    this._homeService.getHomes().subscribe(response=>{
      this.homes = response.homes; 
    })
  }


  choseHome(){
    this.message_error = '';
    this.reserves = [];
    this.counter_reservesConfirmed = 0;
    this.counter_reservesRefused = 0;
    this.selected_mounth_reserve = [];
    this.mounths_reserves_currentYear =  Calendary.sort_reserves();
    this.mounths_reserves_nextYear =  Calendary.sort_reserves();
    if(this.chosed_year == '#'){
      this.message_error = this.language.admin.client_reserves.year;
    }else{
      if(this.chosed_mounth == '#'){
        this.message_error = this.language.admin.client_reserves.mounth;
      }else{
        if(this.selected_home == '#'){
          this.message_error = this.language.admin.client_reserves.home;

      }else{
        this.selected_year = parseInt(this.chosed_year);
        let home_selectedData = this.selected_home.split('-');
        this.home_name = home_selectedData[1];
         this._reserveService.getReserve_byHome(home_selectedData[0]).subscribe(response=>{
              this.reserves = response.reserves;
              if(this.reserves.length > 0){
                            
                this.reserves.forEach(reserve=>{
                  let checkInSplit = reserve.checkIn.split('-');
                  let year = parseInt(checkInSplit[0]);
                  let index_mounth = parseInt(checkInSplit[1])-1;

                  if(year == this.current_year){                               
                    this.mounths_reserves_currentYear[index_mounth].push(reserve) ;
                  }else{                    
                    this.mounths_reserves_nextYear[index_mounth].push(reserve) ;
                  }
                  
                  /*  adatto la data  */
                  let dates = Calendary.adapt_date(reserve.checkIn, reserve.checkOut);
                  reserve.checkIn = dates.checkIn;
                  reserve.checkOut = dates.checkOut;
                })     
     
               if(this.selected_year == this.current_year){
                this.selected_mounth_reserve =  this.mounths_reserves_currentYear[parseInt(this.chosed_mounth)];
               }else{
                this.selected_mounth_reserve = this.mounths_reserves_nextYear[parseInt(this.chosed_mounth)];
               } 

               /*    ordino prenotazioni   */
               let reserves = [];
               for(let i=1; i<this.selected_mounth_reserve.length; i++){
                  if(this.selected_mounth_reserve[i].status == "prenotata")   this.counter_reservesConfirmed++;
                  if(this.selected_mounth_reserve[i].status == "annullata")   this.counter_reservesRefused++;

                  reserves.push(this.selected_mounth_reserve[i].checkIn);
               }
         
              let ascendingOrder_reserves = reserves.sort();      
              let sort_reserves:any = [this.selected_mounth_reserve[0]]; 

              ascendingOrder_reserves.forEach(checkIn=>{     
                this.selected_mounth_reserve.map(reserve=>{
                  if(reserve.checkIn == checkIn){
                    sort_reserves.push(reserve);
                  }
                })
                
              })
            
             this.selected_mounth_reserve = sort_reserves;      //   prenotazioni ordinate
              
              }else{
                 this.message_general = this.language.admin.client_reserve.no_reserves_home;
              }
         })
    }
    }
    }
  
    
    

  }






}
