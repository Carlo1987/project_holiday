import { Component } from '@angular/core';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
})
export class HomesComponent {

  public url:string = Global.url_home;
  public url_front:string = Global.url_home_front;
  public language:any = Global.setLanguage();
       
    ///   file da passare
    public datas = {
      title : this.language.homes.title_visit,
      urls : {
        back : this.url,
        front : this.url_front+'/'
      },
      language : this.language.homes.title_visit.substr(0,6)
  
    }




}
