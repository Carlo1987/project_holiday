import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from 'src/app/services/global'; 

import { gsap } from "gsap";
import { ExpoScaleEase } from "gsap/EasePack";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {
  public language:any = Global.setLanguage();
  public images:any;
  private counter:number = 1;
  
  @ViewChild ('carouselSardinia',{static:true}) carousel!:ElementRef<HTMLDivElement>;


  constructor(){
    const url_image = "../../../assets/img/sardegna";
    this.images = [
      {
        img : `${url_image}/img_sardegna01.jpg`,
        message : this.language.index.message_1
      },
      {
        img : `${url_image}/img_sardegna02.jpg`,
        message : this.language.index.message_2
      },
      {
        img : `${url_image}/img_sardegna03.jpg`,
        message : this.language.index.message_3
      },
      {
        img : `${url_image}/img_sardegna04.jpg`,
        message : this.language.index.message_4
      },
    ];
  }


  ngAfterViewInit(): void {
    gsap.registerPlugin(ExpoScaleEase);     

    setInterval(()=>{
      this.animation_images();
    },3000);
   
  }






  animation_images(){

  this.counter++;
  let prev = this.counter-1;

  if(this.counter > this.images.length){
    this.counter = 1;
    prev = this.images.length;
  }  
      
   let tl = gsap.timeline({                  
    repeat : 0
   });

    tl.to(`.image_welcome--opacity${prev}`,{               
    duration : 1.5,        
    opacity : 0,                                       
  }); 
 
    tl.to(`.image_welcome--opacity${this.counter}`,{                    
      duration : 1.5,        
      opacity : 1,                               
    },"-=1.5"); 
     

  }



}
