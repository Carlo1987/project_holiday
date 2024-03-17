import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global'; 


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  public language:any = Global.initial_language;

  constructor(){}

  ngOnInit(): void {
    this.language = Global.setLanguage();
  }





 

}
