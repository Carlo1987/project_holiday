import { Component, OnInit} from '@angular/core';
import { Global } from './services/global';
import { ExtraService } from './services/extra_service';
import { HomeService } from './services/home_sercive';
import { italian } from './language/italian'; 
import { español } from './language/spanish'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ExtraService, HomeService]
})
export class AppComponent implements OnInit{
 public language:any =  italian;
 public current_year:number;
 public user:any;
 public url_acount:string;
 public check_acount:boolean;
 public homes:Array<any> = [];

  constructor(
    private _extraService : ExtraService,
    private _homeService : HomeService,
  ){
    this.current_year = new Date().getFullYear();
    this.url_acount = Global.url_acount;
    this.check_acount = false;
  }


  ngOnInit(): void {   
    this.language = Global.setLanguage();
    this.update_year();
    this.session_manage();
    this.token_manage();  
    this.getHomes(); 
  }



  setItalian(){  
      this.setLanguage(italian);
  }


  setSpanish(){
     this.setLanguage(español);
  }



  setLanguage(language:any){
     sessionStorage.setItem('lang', JSON.stringify(language));
     window.location.reload();
  }



  session_manage(){
    if(localStorage.getItem('user')){
      let data =  JSON.parse(localStorage.getItem('user')!);
      this.user = data.user;
      this.check_acount = true;
 
      let expirationSession = Global.expiration(data.expiration);
 
      if(expirationSession){                     //   se sono passate tre ore dall'ultima connessione, cancella la sessione
        localStorage.removeItem('user');
        
        }else{                                //    se non sono passate le tre ore, mantiene la sessione e ogni ora la aggiorna
          let new_expiration = Global.create_sessionExpitation();         
          let expiration = Global.session_update(data.user , data.expiration , new_expiration);
          if(expiration != ''){                                             //    ogni ora la sessione aggiorna l'ora di "expiration"                                       
               localStorage.setItem('user', JSON.stringify(expiration));     
          }
      } 
    }
  }



  token_manage(){
    if(localStorage.getItem('token')){
      let data =  JSON.parse(localStorage.getItem('token')!);

      let expirationToken = Global.token_expiration(data.expiration);

      if(expirationToken){
         localStorage.removeItem('token');
      }
    }
  }





  update_year(){
     this._extraService.getExtra().subscribe(response=>{
     
      let calendary_currentYear = response.extra.current_year;

      if(calendary_currentYear <= this.current_year-1){      
        this._extraService.updateYear(this.current_year).subscribe(extra=>{
          console.log(extra.message);
          this._homeService.getHomes().subscribe(response=>{
            let homes = response.homes;
  
            for(let i=0; i<homes.length; i++){
               this._homeService.update_price_newYear(homes[i]._id, homes[i]).subscribe(home=>{
                    console.log(home.message);        
              })             
            }  
         });
        });  
      }
     })
  }



  getHomes(){
    this._homeService.getHomes().subscribe(response=>{
      this.homes = response.homes;
    })
  }



  logout(){
    localStorage.removeItem('user');  
    localStorage.removeItem('reserve');
    window.location.href = `http://localhost:4200`;
}






}
