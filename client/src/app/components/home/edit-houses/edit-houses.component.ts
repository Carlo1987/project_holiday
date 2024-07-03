import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from 'src/app/services/global';
import { HomeService } from 'src/app/services/home_sercive';

@Component({
  selector: 'app-edit-houses',
  templateUrl: '../../home/homes/homes.component.html',
  styleUrls: ['./edit-houses.component.css'],
  providers: [HomeService]
})
export class EditHousesComponent implements OnInit{
  public homes:Array<any> = [];
  public url:string = Global.url_home;
  public url_front:string = Global.url_index_front;
  public language:any = Global.setLanguage();
  public title:string = this.language.homes.title_edit;
  @ViewChild ('carousel_homes') carousel!:ElementRef<HTMLDivElement>;
  @ViewChild ('carousel_homes_maxSize') carousel_MaxSize!:ElementRef<HTMLDivElement>;
  @ViewChild ('carousel_homes_minSize') carousel_MinSize!:ElementRef<HTMLDivElement>;

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
      back : this.url,
      front : this.url_front
    }
  
    let lang = this.language.homes.edit;

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
          <a href="${url.front}/home-update&delete/${home._id}" class="btn btn-primary">${lang}!</a>
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
