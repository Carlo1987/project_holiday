import { Component,AfterViewInit , ViewChild, ElementRef } from '@angular/core';
import { HomeService } from 'src/app/services/home_sercive';
import { Global } from 'src/app/services/global';
import { max } from 'rxjs';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
  providers: [HomeService]
})
export class HomesComponent implements AfterViewInit{
  public homes:Array<any>;
  public url:string;
  public url_front:string = Global.url_home_front;
  public language:any = Global.setLanguage();
  @ViewChild ('carousel_homes') carousel!:ElementRef<HTMLDivElement>;
  @ViewChild ('carousel_homes_maxSize') carousel_MaxSize!:ElementRef<HTMLDivElement>;
  @ViewChild ('carousel_homes_minSize') carousel_MinSize!:ElementRef<HTMLDivElement>;
      

  constructor(
    private _homeService : HomeService
  ){
    this.homes = [];
    this.url = Global.url_home;
  }

  ngAfterViewInit(): void {
    this.getHomes();
  }




  getHomes(){
      this._homeService.getHomes().subscribe(response=>{
         this.homes = response.homes;  
       this.Carousel(this.homes);
      })
  }




  Carousel(homes:any){

    let urls = {
      back : this.url,
      front : this.url_front
    }
  
    let lang = this.language.homes.title;

    const carousel = this.carousel;


  this.carousel_MaxSize.nativeElement.innerHTML = show(homes,4);                   //   carousel grandezza schermo PC grande
  this.carousel_MinSize.nativeElement.innerHTML = show(homes,1);                   //   carousel grandezza schermo cellulare


  ///   carousel grandezza schermo PC e Tablet (responsive)
  const mqMedium = window.matchMedia( `(min-width: 870px)` );                                                      
     
   mqMedium.addEventListener('change', mqHandler);      
    
      
    function mqHandler(e:any) {
      if(e.matches ){
          carousel.nativeElement.innerHTML = show(homes,3);
      } else{        
         carousel.nativeElement.innerHTML = show(homes,2);
      }  
    } 

   mqHandler(mqMedium);  
   



 function show(homes:Array<any>,limit:number){
  let container = "";

  function Card(home:any,lang:string,url:any){
    return `
    <div class="card" >    
        <img src="${url.back}/get_avatar/${home.avatar}" class="d-block w-100 rounded-top" alt="home_img">
     
        <div class="card-body">
          <h5 class="card-title">${home.name}</h5>
          <p class="card-text">${(home.description).slice(0,45)} ...</p>
          <a href="${url.front}/${home._id}" class="btn btn-primary">${lang}!</a>
        </div>
     </div>
    `;
  }



   homes.forEach((home,i)=>{    

    let index = i+1;

    if(limit != 1){
      if(i == 0 ){
      
        container += `<div class="carousel-item active"> ${Card(home,lang,urls)}`;
  
      }else if(index % limit == 0 && index != homes.length){
  
        container += `${Card(home,lang,urls)} </div>   <div class="carousel-item"> `;       
      
      }else if(index == homes.length){
        container += `${Card(home,lang,urls)} </div> `;
         
      }else{
        container += Card(home,lang,urls);
      }

    }else{
      if(i == 0){
        container += `<div class="carousel-item active"> ${Card(home,lang,urls)}</div>`;
      }else{
        container += `<div class="carousel-item"> ${Card(home,lang,urls)}</div>`;
      }
    }
  
   })

   return container;
  
}

}







}
