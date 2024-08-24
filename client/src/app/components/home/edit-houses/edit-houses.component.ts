import { Component } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-edit-houses',
  templateUrl: './edit-houses.component.html',
  styleUrls: ['./edit-houses.component.css'],
})
export class EditHousesComponent{

  public url:string = Global.url_home;
  public url_front:string = Global.url_index_front;
  public language:any = Global.setLanguage();

    ///   file da passare
    public datas = {
      title : this.language.homes.title_edit,
      urls : {
        back : this.url,
        front : this.url_front+'/home-update&delete/'
      },
      language : this.language.homes.edit
  
    }




}
