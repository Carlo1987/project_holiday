import { Component, ViewChild, ElementRef , OnInit, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
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
export class AppComponent implements OnInit,DoCheck{
 public language:any =  italian;
 public current_year:number;
 public url_acount:string = Global.url_acount;;

 public identity:any = Global.getIdentity();
 public access:boolean = false;
 public nav_acount:boolean = false;
 public homes:Array<any> = [];
 @ViewChild('flag', {static:true}) flag!: ElementRef<HTMLImageElement>;  

  constructor(
    private _router : Router,
    private _extraService : ExtraService,
    private _homeService : HomeService,
  ){
    this.current_year = new Date().getFullYear();
  }


  ngOnInit(): void {   
    this.language = Global.setLanguage();
    if(this.identity.status)   this.access = true;
    this.getHomes(); 
    this.update_year(); console.log(this.identity.status+'---'+this.access);
    
  }



  ngDoCheck(): void {
    this.setFlag();
    this.identity = Global.getIdentity();
    this.session_manage();
    this.expiration_sessions('code_passw');
    this.expiration_sessions('user_review');
  }




  setLanguage(get_language:string){
    let language = italian;

    if(get_language == 'esp'){
      language = español; 
    }else if(get_language == 'ita'){
      language = italian;
    }
    sessionStorage.setItem('lang', JSON.stringify(language));
   
    window.location.reload();
  }


  setFlag(){
    let image = "bandiera_italia.png";
    if(sessionStorage.getItem('lang')){
      let language = JSON.parse(sessionStorage.getItem('lang')!);
      if(language.language == 'español'){
        image = "bandiera_spagna.png";
      }else if(language.language == 'italiano'){
        image = "bandiera_italia.png";
      }
    }
    this.flag.nativeElement.setAttribute('src',`../assets/img/flags/${image}`);
  }



  session_manage(){
    if(this.identity.status){
      let data =  JSON.parse(localStorage.getItem('user')!);
 
      let expirationSession = Global.expiration(data.expiration);
 
      if(!expirationSession){                     //   se sono passate tre ore dall'ultima connessione, cancella la sessione
        localStorage.removeItem('code_passw');
        localStorage.removeItem('token');
        localStorage.removeItem('reserve');
        localStorage.removeItem('user');
        
      }else{                                //    se non sono passate le tre ore, mantiene la sessione e ogni ora la aggiorna

          let update_session = Global.session_update(data.expiration);

          if(update_session){

            let expiration = Global.create_expiration_sessions(60*3);
            let user = Global.session_create(data,expiration);
            localStorage.setItem('user',JSON.stringify(user));
          }
      } 
    }
  }



  expiration_sessions(storage:string){                                      /*  metodo per l'espirazione sessioni varie   */
    if(localStorage.getItem(storage)){
      let data =  JSON.parse(localStorage.getItem(storage)!);

      if(!Global.expiration(data.expiration)){
        localStorage.removeItem(storage);
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
    localStorage.removeItem('reserve');
    localStorage.removeItem('reserve_start');
    localStorage.removeItem('token');
    localStorage.removeItem('user');  

    this._router.navigate(['']);
}





navAcount_visibility(){
  if(!this.nav_acount){
    this.nav_acount = true;
    
  }else{
    this.nav_acount = false;
  }
}



link(url:string,value:string|null = null){
  if(value != null)   url =  url+value;
  this._router.navigate([url]);
  this.nav_acount = false;
}






}
