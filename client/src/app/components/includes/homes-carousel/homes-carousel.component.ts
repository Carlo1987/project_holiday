import { Component, OnInit , ViewChild, ViewChildren , QueryList , ElementRef , Input } from '@angular/core';
import { HomeService } from 'src/app/services/home_sercive';

@Component({
  selector: 'app-homes-carousel',
  templateUrl: './homes-carousel.component.html',
  styleUrls: ['./homes-carousel.component.css'],
  providers: [HomeService]
})
export class HomesCarouselComponent implements OnInit{
  public homes:Array<any> = [];
  public divs_max:number  = 0; 
  public divs_min:number  = 0; 
  private start:number = 0;

  @ViewChild ('carousel_homes_max') carousel_homes_max!:ElementRef<HTMLDivElement>;
  @ViewChild ('carousel_homes_min') carousel_homes_min!:ElementRef<HTMLDivElement>;
  @Input() datas:any;





  constructor(
    private _homeService : HomeService,
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

  let carousel_max = this.show(homes,3);
  let carousel_min = this.show(homes,2);

  this.carousel_homes_max.nativeElement.style.width = `${carousel_max.counter}00%`;
  this.divs_max = carousel_max.counter;
  this.carousel_homes_max.nativeElement.innerHTML = carousel_max.container;

  this.carousel_homes_min.nativeElement.style.width = `${carousel_min.counter}00%`;
  this.divs_min = carousel_min.counter;
  this.carousel_homes_min.nativeElement.innerHTML = carousel_min.container;
}



show(homes:Array<any>,limit:number){
  let container = "";

  let urls = {
    back : this.datas.urls.back,
    front : this.datas.urls.front
  }

  let lang = this.datas.language;
  
  function Card(home:any,lang:string,url:any){
    return `
    <div class="card">    
        <img src="${url.back}/get_avatar/${home.avatar}" class="d-block w-100 rounded-top" alt="home_img">
     
        <div class="card-body">
          <h5 class="card-title">${home.name}</h5>
          <p class="card-text">${(home.description).slice(0,45)} ...</p>
          <a href="${url.front}${home._id}" class="btn btn-primary">${lang}!</a>
        </div>
     </div>
    `;
  }
  
  
  let counter = 0;
  
   homes.forEach((home,i)=>{    
  
    let index = i+1;
  
    if(limit != 1){

      if(i == 0 ){
        container += `<div class="div_homes"> ${Card(home,lang,urls)}`;    
        counter++;
      }else if(index % limit == 0 && index != homes.length){
        container += `${Card(home,lang,urls)} </div>   <div class="div_homes"> `;      
        counter++;
      }else if(index == homes.length){
        container += `${Card(home,lang,urls)} </div> `;  
      }else{
        container += Card(home,lang,urls);
      }

    }else{
        container += `<div class="div_homes"> ${Card(home,lang,urls)}</div>`;   
        counter++;
    }
  
   })
  
   return {
    container : container,
    counter : counter
   }
}







 translate_max(value:number){

   if(value == 1 && this.start < this.divs_max-1){
    this.start++;
    
  }else if(value == 0 && this.start > 0){
    this.start--;
  }

  let translation = this.start * -(100 / this.divs_max);
  
  this.carousel_homes_max.nativeElement.style.transform = `translateX(${translation}%)`; 
} 



translate_min(value:number){

  if(value == 1 && this.start < this.divs_min-1){
   this.start++;
   
 }else if(value == 0 && this.start > 0){
   this.start--;
 }

 let translation = this.start * -(100 / this.divs_min);
 
 this.carousel_homes_min.nativeElement.style.transform = `translateX(${translation}%)`; 
} 








}
