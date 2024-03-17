import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from 'src/app/services/home_sercive';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
  providers: [HomeService]
})
export class HomesComponent implements OnInit{
  public homes:Array<any>;
  public url:string;
  public language:any = Global.initial_language;
  @ViewChild ('carousel_homes') carousel!:ElementRef<HTMLDivElement>;
  @ViewChild ('carousel_homes_responsive') carousel_response!:ElementRef<HTMLDivElement>;
      

  constructor(
    private _homeService : HomeService
  ){
    this.homes = [];
    this.url = Global.url_home;
  }

  ngOnInit(): void {
    this.language = Global.setLanguage();
    this.getHomes();
  }


  getHomes(){
      this._homeService.getHomes().subscribe(response=>{
         this.homes = response.homes;         
         this.show(this.homes);
      })
  }



  show(homes:Array<any>){
      let html = "";
      let html_responsive = "";
      let text = this.language.homes.title;

      ////////////   ciclo per creare una card per una casa
      function bucle_carousel(url:string, direction:string, home:any){
        let side = "";
        if(direction == "right"){
          side = "float:right;";
        }else  if(direction == "left"){
          side = "float:left;";
        }

        let card = `
        <div class="card cardHomes" style=" ${side} ">    
            <img src="${url}/get_avatar/${home.avatar}" class="d-block w-100 rounded-top" alt="home_img"'>
            <img src="${url}/get_avatar/${home.avatar}" class="d-block w-100 rounded-top img_responsive" alt="home_img"'>
            <div class="card-body">
              <h5 class="card-title">${home.name}</h5>
              <p class="card-text">${(home.description).slice(0,50)} ...</p>
              <a href="http://localhost:4200/home/${home._id}" class="btn btn-primary">${text}!</a>
             </div>
         </div>
        `;
      return card;
      }
      ///////////////////////////////////////////////////// 


      let counter = [];
      for(let i=0; i<=homes.length; i++){
        if(i%3 == 0)    counter.push(i);
      }
      let odd_number = counter[counter.length-1];

      ///////  carousel  grandezza normale   //////
  
      for(let i=0; i<=homes.length; i++){ 
        let class_carousel = "carousel-item";  
        if(i == 3){ class_carousel = "carousel-item active";  }    
      
        if(i%3 == 0 && i != 0){        

          if(homes.length % 3 == 0 || homes.length%3 != 0 && i < odd_number){      
            html += `
            <div class="${class_carousel}">
                ${bucle_carousel(this.url, "left", homes[i-3])}
                ${bucle_carousel(this.url, "left", homes[i-2])}
                ${bucle_carousel(this.url, "left", homes[i-1])}
            </div>
            `;
          }else if(homes.length%3 != 0 && i == odd_number){
           
            if(homes.length - odd_number == 1){
              html += `
              <div class="${class_carousel}">
                 ${bucle_carousel(this.url, "left", homes[i-3])}
                 ${bucle_carousel(this.url, "left", homes[i-2])}
                 ${bucle_carousel(this.url, "left", homes[i-1])}
              </div>
              <div class="carousel-item">
                  ${bucle_carousel(this.url, "left", homes[i])}
              </div>
              `;
            }else if(homes.length - odd_number == 2){
              html += `
              <div class="${class_carousel}">
                 ${bucle_carousel(this.url, "left", homes[i-3])}
                 ${bucle_carousel(this.url, "left", homes[i-2])}
                 ${bucle_carousel(this.url, "left", homes[i-1])}
              </div>
              <div class="carousel-item">
                  ${bucle_carousel(this.url, "left", homes[i])}
                  ${bucle_carousel(this.url, "left", homes[i+1])}
              </div>
              `;
            } 
          }
        } 
      }
  

      /////   carousel  responsive   /////////

      for(let i=0; i<homes.length; i++){
        let class_carousel = "carousel-item";
        if(i == 0)    class_carousel = "carousel-item active";           

        if(i%2 == 0){
          if(homes.length % 2 == 0 || homes.length % 2 != 0 && i != homes.length-1){
            html_responsive += `
            <div class="${class_carousel}">
                ${bucle_carousel(this.url, "left", homes[i])}
                ${bucle_carousel(this.url, "right", homes[i+1])}
            </div>
            `;
          }else if(homes.length % 2 != 0 && i == homes.length-1){
            html_responsive += `
            <div class="${class_carousel}">
                ${bucle_carousel(this.url, "left", homes[i])}
            </div>
            `;
          }
        }
      }

      this.carousel.nativeElement.insertAdjacentHTML('afterbegin',html);
      this.carousel_response.nativeElement.insertAdjacentHTML('afterbegin',html_responsive);
  } 


}
