import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from 'src/app/services/global'; 


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {
  public language:any = Global.setLanguage();
  public interval:string = "4000";
  
  @ViewChild ('carouselSardinia',{static:true}) carousel!:ElementRef<HTMLDivElement>;


  ngAfterViewInit(): void {

    const url =  "../assets/img/sardegna";
     let images = "";

     for(let i=0; i<6; i++){
       let class_carousel = "carousel-item";
          if(i==0){
             class_carousel = "carousel-item active"
         }   

      let html = `
       <div class="${class_carousel}" data-bs-interval="${this.interval}">
          <img src="${url}/img_sardegna0${i+1}.jpg" class="d-block w-100" alt="img_carousel">
       </div> 
      `;

      images += html;
        
     }


     this.carousel.nativeElement.insertAdjacentHTML('afterbegin',images);
  }



}
