import { Component, OnInit} from '@angular/core';
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
  public language:any = Global.setLanguage();
  public url:string = Global.url_home;
  public url_front:string = Global.url_index_front;
  public current_year:number = new Date().getFullYear();
  public mounths:Array<string> = Calendary.mounth_names();
  public reserves:Array<any> = [];
  public homes:Array<any> = [];
  public selected_home:string = '#';
  public chosed_mounth:string = '#';
  public chosed_year:string = '#'; 
  public selected_mounth:string = '';
  public selected_year:string = '';
  public selected_mounth_reserve:Array<any> = [];
  public home_reserve:any;
  public counter_reservesConfirmed:number = 0;
  public counter_reservesRefused:number = 0;
  public modalPayment:any;
  public message_general:string = this.language.admin.client_reserves.select;
  public message_error:string = '';
  public token:string|null = Global.getToken();
  public user:any = Global.getIdentity().user;
  public private_datas:any = {};


  constructor(
    private _reserveService : ReserveService,
    private _homeService : HomeService
  ){
    this.modalPayment = {
      set : false,
      _id : ""
    }
  }


  ngOnInit(): void {

      this.getHomes();    
      this.message_general= this.language.admin.client_reserves.select;
  }


  getHomes(){
    this._homeService.getHomes().subscribe(response=>{
      this.homes = response.homes;       
    })
  }




  choseHome(){
    this.message_error = '';
    this.message_general = '';
    this.selected_mounth_reserve = [];
    this.counter_reservesConfirmed = 0;
    this.counter_reservesRefused = 0;
    
    if(this.chosed_year == '#'){
      this.message_error = this.language.admin.client_reserves.year;
    
    }else{
      if(this.chosed_mounth == '#'){
        this.message_error = this.language.admin.client_reserves.mounth;
      
      }else{
        if(this.selected_home == '#'){
          this.message_error = this.language.admin.client_reserves.home;
        
        }else{
          let mounth = this.chosed_mounth;
          if(parseInt(this.chosed_mounth) < 10){ 
            mounth = '0'+parseInt(this.chosed_mounth);
           }

          let data = {
            home_id : this.selected_home,
            year : this.chosed_year,
            mounth : mounth
          }
          
          this._reserveService.getReserve_byHome(data,this.user.status,this.token).subscribe(reserves=>{
            if(reserves.message)    this.message_error = reserves.message;
                
            if(reserves.length == 0 ){
               this.message_general = this.language.admin.client_reserves.no_reserves_mounth;
            }else{
              this.selected_mounth = this.language.mounth_names[parseInt(this.chosed_mounth)-1];
              this.selected_year = this.chosed_year;
              
               for(let i=0; i<reserves.length; i++){                
                 reserves[i].status == 'prenotata' ? this.counter_reservesConfirmed++ :   this.counter_reservesRefused++;
               }

              this.homes.map(home=>{
                   let serch_name = home._id.includes(data.home_id);
                   if(serch_name)   this.home_reserve = home;                       
              }) 

              this.selected_mounth_reserve = reserves;                    
            }
          }) 
        }
      }
    }
  }



  activeModal(set:boolean,reserve_id:string){
    if(set){
      this.modalPayment = {
        set : true,
        _id : reserve_id
      }
    }else{
      this.modalPayment = {
        set : false,
        _id : ""
      }
    }
   
  } 



  typePayment(type:string){
    let payment = "bonifico";
    if(type == 'card'){
        payment = "carta di debito";
    }
    return payment;
 }



 censured(data:string|number,reserve_userID:string){
  let result = data;
  if(localStorage.getItem('user')){
    let user = JSON.parse(localStorage.getItem('user')!).user;

    if(user._id != reserve_userID){
      result = "censured";
    }
  }
  return result;
 }



 link(url:string){
  window.open(this.url_front+url);
 }

}
