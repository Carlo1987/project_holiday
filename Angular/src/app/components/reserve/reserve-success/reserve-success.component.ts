import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/services/global';
import { ReserveService } from 'src/app/services/reserve_service';
import { HomeService } from 'src/app/services/home_sercive'; 

@Component({
  selector: 'app-reserve-success',
  templateUrl: './reserve-success.component.html',
  styleUrls: ['./reserve-success.component.css'],
  providers: [ReserveService, HomeService]
})
export class ReserveSuccessComponent implements OnInit{
 public language:any = Global.initial_language;
 public url_home:string = Global.url_home;
 public reserve:any;
 public home_name:string = '';

  constructor(
    private _router : Router,
    private _route : ActivatedRoute,
    private _reserveService : ReserveService,
    private _homeService : HomeService
  ){}


  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.language = Global.setLanguage();
      
      localStorage.removeItem('reserve');
      this._route.params.subscribe(param=>{                                        
        let id = param['id'];
        this.get_reserve(id);
      })
   
    }else{
       this._router.navigate(['']);
    }
  }



  get_reserve(id:string){
    this._reserveService.getReserve(id).subscribe(response=>{
      this.reserve= response.reserve;
      this.getHome(this.reserve.home_id);      
    })
  }



  getHome(id:string){
    this._homeService.getHome(id).subscribe(response=>{
      this.home_name = response.home.name;      
    })
  }




}
