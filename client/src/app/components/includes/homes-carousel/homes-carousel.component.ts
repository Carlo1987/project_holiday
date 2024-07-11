import { Component, OnInit, ViewChild, ElementRef , Input } from '@angular/core';
import { HomeService } from 'src/app/services/home_sercive';

@Component({
  selector: 'app-homes-carousel',
  templateUrl: './homes-carousel.component.html',
  styleUrls: ['./homes-carousel.component.css'],
  providers: [HomeService]
})
export class HomesCarouselComponent implements OnInit{
  public homes:Array<any> = [];
 
  @ViewChild ('carousel_homes') carousel!:ElementRef<HTMLDivElement>;


  @Input() datas:any;





  constructor(
    private _homeService : HomeService
  ){}



  ngOnInit(): void {
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
    back : this.datas.urls.back,
    front : this.datas.urls.front
  }

  let lang = this.datas.language;

const carousel = this.carousel;


const mqMedium = window.matchMedia( `(min-width: 700px)` );                                                      
   
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
        <a href="${url.front}${home._id}" class="btn btn-primary">${lang}!</a>
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
