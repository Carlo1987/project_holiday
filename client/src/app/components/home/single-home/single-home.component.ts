import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home_sercive';
import { Global } from 'src/app/services/global';
import { Home } from 'src/app/models/home/home';
import { home_details } from 'src/app/models/home/home_details';
import { home_beds } from 'src/app/models/home/home_beds';
import { home_calendary } from 'src/app/models/home/home_calendary';

@Component({
  selector: 'app-single-home',
  templateUrl: './single-home.component.html',
  styleUrls: ['./single-home.component.css'],
  providers: [HomeService]
})
export class SingleHomeComponent implements OnInit{
  public language:any = Global.setLanguage();
  public url:string = Global.url_home;
 // public home:any = Home;
  public home:any = new Home("","","","",0,0,0,'', home_beds ,home_details, home_calendary);
  public home_images_number:number = 0;
  public first_image:string = '';
  public first_images:Array<string> = [];
///  quantità letti ////
  public quantity_rooms:string = '1 stanza da letto'; 
  public type_beds:Array<string> = [];
  public plus_beds:Array<string> = [];
  ////  dati da passare  ////
  public data_reserve:any;
  /////   valutazione
  public home_vote:number = 0;


  constructor(
    private El : ElementRef,
    private _route : ActivatedRoute,
    private _homeService : HomeService,
  ){}



  ngOnInit(): void {
     this._route.params.subscribe(param=>{
       let id = param['id'];

      this.getHome(id);    
     })

     this.quantity_rooms = this.language.singleHome.room;
  }


  getHome(id:string){
    this._homeService.getHome(id).subscribe(response=>{
          this.home = response.home;    
          this.first_image = this.home.images[0];
          this.first_images = this.home.images.filter((img:string,index:number) => index <= 4 && index != 0);
          this.home_images_number = this.home.images.length;
//console.log(this.home);

          this.carousel(this.home.images);         
                   
          if(this.home.rooms > 1)  this.quantity_rooms = this.home.rooms+ ' ' +this.language.homes.rooms;
          if(this.home.beds.doble_beds != 0){ (this.home.beds.doble_beds == 1) ? this.type_beds.push(this.language.singleHome.doble_bed) : this.type_beds.push((this.home.beds.doble_beds)+' '+this.language.homes.doble_bed); }  
          if(this.home.beds.single_beds != 0){ (this.home.beds.single_beds == 1) ? this.type_beds.push(this.language.singleHome.single_bed) : this.type_beds.push((this.home.beds.single_beds)+' '+this.language.homes.single_bed); }  
          if(this.home.beds.sofa_beds != 0){ (this.home.beds.sofa_beds == 1) ? this.plus_beds.push(this.language.singleHome.sofa) : this.plus_beds.push((this.home.beds.sofa_beds)+' '+this.language.homes.sofa); }  
          if(this.home.beds.forniture_beds != 0){ (this.home.beds.forniture_beds == 1) ? this.plus_beds.push(this.language.singleHome.wardrobe) : this.plus_beds.push((this.home.beds.forniture_beds)+' '+this.language.homes.wardrobe); }  
          if(this.home.beds.bunk_beds != 0){ (this.home.beds.bunk_beds == 1) ? this.type_beds.push(this.language.singleHome.bunk_bed) : this.type_beds.push((this.home.beds.bunk_beds)+' '+this.language.homes.bunk_bed); } 
           this.writeRooms(this.type_beds , this.plus_beds);
       
          this.data_reserve = {
            _id: this.home._id, 
            name: this.home.name, 
            avatar : this.home.avatar,
            guests: this.home.guests, 
            calendary_reserve:this.home.calendary_prices.reserves, 
            calendary_price:this.home.calendary_prices.prices  
           }; 
    })
  }



  writeRooms(beds:Array<string> , plus:Array<string>){
    const div = document.querySelector('.home_rooms');
    let rooms_beds = `N° ${this.quantity_rooms}: `;

    beds.forEach(bed=>{
      if(bed == plus[plus.length-1]){
        rooms_beds += bed;
      }else{
        if(bed == beds[beds.length-1]){
          rooms_beds += bed;
        }else{
          rooms_beds += bed+', ';
        }
      }
    })

    if(plus.length > 0){
      rooms_beds += `<br> ${this.language.singleHome.more}: `;
      plus.forEach(bed=>{
        if(bed == plus[plus.length-1]){
          rooms_beds += bed;
        }else{
          if(bed == beds[beds.length-1]){
            rooms_beds += bed;
          }else{
            rooms_beds += bed+', ';
          }
        }   
      })
    }
   div?.insertAdjacentHTML('beforeend',rooms_beds);
  }




  carousel(images:Array<string>){
    const carousel_inner = this.El.nativeElement.querySelector('.carousel-inner');
     let html = "";

     images.forEach((image,index)=>{
         if(index == 0){
          html += `
                <div class="carousel-item active">
                    <img src="${this.url}/get_image/${image}" alt="image">
                    <div class="carousel-caption">
                       <p class="index_image btn btn-dark">1/${images.length}</p>
                    </div>
                </div>
          `;
         }else{
          html += `
                <div class="carousel-item">
                    <img src="${this.url}/get_image/${image}" alt="image">
                    <div class="carousel-caption">
                    <p class="index_image btn btn-dark">${index+1}/${images.length}</p>
                 </div>
                </div>
          `;
         }
     })
 
     carousel_inner.insertAdjacentHTML('afterbegin',html); 
     
  }




 getAverage(event:number){
      this.home_vote = event;     
 }


}
