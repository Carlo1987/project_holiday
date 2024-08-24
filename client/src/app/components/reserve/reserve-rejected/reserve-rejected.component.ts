import { Component , OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-reserve-rejected',
  templateUrl: './reserve-rejected.component.html',
  styleUrls: ['./reserve-rejected.component.css']
})
export class ReserveRejectedComponent implements OnInit{
  public language:any = Global.setLanguage();
  public home_id:string = "";



  constructor(
    private _route : ActivatedRoute,
  ){}


  ngOnInit(): void {
    this.getHomeID();
    Global.deleteReserve(); 
  }



  getHomeID(){
    this._route.params.subscribe(param=>{                                           
      this.home_id = param['home_id'];
    })
  }

}
