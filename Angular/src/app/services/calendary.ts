import { italian } from "../language/italian"; 


let language = italian;

let current_year = new Date().getFullYear();  
let next_year = current_year+1;

let current_day = new Date().getDate();
let current_mounth = new Date().getMonth()+1;

function leap_year(year:number) {
    let febrary:any = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0}
    if (year%400==0 || (year%4==0 && year%100!=0)) {
        febrary = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0}
    }
    return febrary;
}


let calendary_currentYear:any = [
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    leap_year(current_year),
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0}
];


let calendary_nextYear:any = [
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    leap_year(next_year),
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0}
];


let reserves_currentYear:any = [
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    leap_year(current_year),
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0}
];


let reserves_nextYear:any = [
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    leap_year(next_year),
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0},
    {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0,27:0, 28:0, 29:0, 30:0, 31:0}
];


export const Calendary = {

    setLanguage : function(){
        if(sessionStorage.getItem('lang')){
            language = JSON.parse(sessionStorage.getItem('lang')!);
        }else{
            language = italian;
        }
    },

    days_january : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],


    total_days_mounth: function(year:number){
        let total_days_mounth = [31,28,31,30,31,30,31,31,30,31,30,31];
        if (year%400==0 || (year%4==0 && year%100!=0)) {
            total_days_mounth =[31,29,31,30,31,30,31,31,30,31,30,31];
        }
        return total_days_mounth;
    },


    


    mounth_names: function(){
        let mounth_names = italian.mounth_names;
        if(sessionStorage.getItem('lang')){
            let language = JSON.parse(sessionStorage.getItem('lang')!);
            mounth_names = language.mounth_names;
        }
        return mounth_names;
    },



    adapt_date(first:string, second:string){
      let checkIn = this.date_reserveSplit(first);   
      let checkOut = this.date_reserveSplit(second);
      let result = {
        checkIn : `${checkIn.day} ${this.mounth_names()[checkIn.mounth]} ${checkIn.year}`,
        checkOut : `${checkOut.day} ${this.mounth_names()[checkOut.mounth]} ${checkOut.year}`
      }   
      return result;
    },


    sort_reserves(){
        let mounths = italian.sort_reserves;
        if(sessionStorage.getItem('lang')){
            let language = JSON.parse(sessionStorage.getItem('lang')!);
            mounths = language.sort_reserves;
        }
        return mounths;
    },


   /////////////////// CALENDARI PREZZI E DISPONIBILITA' //////////////////////////

    dateSplit: function(date:string){
        let dateSplit = date.split('-');
        let dates = {
            day: parseInt(dateSplit[0]),
            mounth: parseInt(dateSplit[1])-1,
        }
        return dates;
    }, 
 
   
    
    getPrices: function(first:string , second:string, year:number, price:number){
        this.setLanguage();
        let message_error = language.calendary.invalid_date;
   
        let first_date = this.dateSplit(first);
        let second_date = this.dateSplit(second);

        let setCalendary = calendary_currentYear;
        if(year == next_year) setCalendary = calendary_nextYear;

        let setReserve = reserves_currentYear;
        if(year == next_year) setReserve = reserves_nextYear;

        console.log(setCalendary);
        console.log(setReserve);
        
        

        let sign:any = price;
        let reserve = true;
        if(price == 0){
            sign = 'bloccato';
            reserve = false;
        } 
            if(first_date.mounth == second_date.mounth){
                if(second_date.day >= first_date.day){

                    for(let i=first_date.day; i<=second_date.day; i++){
                        setCalendary[first_date.mounth][i] = sign;
                        if(typeof(setReserve[first_date.mounth][i]) != 'string' || typeof(setReserve[first_date.mounth][i]) == 'string' && setReserve[first_date.mounth][i] == 'bloccato'){                            
                            setReserve[first_date.mounth][i] = reserve;
                        }
                    }
                      
                }else{
                    return message_error;
                }
            }else if(first_date.mounth < second_date.mounth){
           
                 for(let x=first_date.mounth; x<=second_date.mounth; x++){
                    if(x == first_date.mounth){
                        for(let i=first_date.day; i<=this.total_days_mounth(year)[x]; i++){
                            setCalendary[x][i] = sign;
                            if(typeof(setReserve[x][i]) != 'string' || typeof(setReserve[x][i]) == 'string' && setReserve[x][i] == 'bloccato'){
                                setReserve[x][i] = reserve;
                            } 
                           }
                    }else if(x != first_date.mounth && x != second_date.mounth){
                        for(let i=1; i<=this.total_days_mounth(year)[x]; i++){
                            setCalendary[x][i] = sign;
                            if(typeof(setReserve[x][i]) != 'string' || typeof(setReserve[x][i]) == 'string' && setReserve[x][i] == 'bloccato'){
                                setReserve[x][i] = reserve;
                            } 
                        }
                    }else if(x == second_date.mounth){
                        for(let i=1; i<=second_date.day; i++){
                            setCalendary[x][i] = sign;
                            if(typeof(setReserve[x][i]) != 'string' || typeof(setReserve[x][i]) == 'string' && setReserve[x][i] == 'bloccato'){
                                setReserve[x][i] = reserve;
                            } 
                        }
                    }
                }       

            }else if(first_date.mounth > second_date.mounth){
                return message_error;
            }

        let calendaries = {
            prices : {
                current_year : calendary_currentYear,
                next_year : calendary_nextYear 
            },
            reserves : {
                current_year : reserves_currentYear,
                next_year : reserves_nextYear
            }
           
        }
      
        return calendaries;
    },



    initial_calendary_prices: function(){
        let calendaries = {
            prices : {
                current_year : calendary_currentYear,
                next_year : calendary_nextYear 
            },
            reserves : {
                current_year : reserves_currentYear,
                next_year : reserves_nextYear
            }
           
        }
        return calendaries;
    },



    show_calendaries: function(year:number){
        let yearString = year.toString();
        let years = [`${current_year}` , `${next_year}`] ;
        let calendaries =  [ calendary_currentYear, calendary_nextYear];

        let search_index = years.indexOf(yearString);
        return calendaries[search_index];
    },



    leap_yearForm: function(){
        let result = false;
        let year = new Date().getFullYear();
        if (year%400==0 || (year%4==0 && year%100!=0)) {
            result = true;
        }
        return result;
    },


  
    setCalendaries: function(_calendary:any ){
         calendary_currentYear = _calendary.prices.current_year;
         calendary_nextYear =  _calendary.prices.next_year;
         reserves_currentYear = _calendary.reserves.current_year;
         reserves_nextYear = _calendary.reserves.next_year;
    },



    //////////////////    CALENDARI PRENOTAZIONI   ///////////////////////////
    
    starting_calndaries_reserves: function(reserves:any, prices:any){
        reserves_currentYear = reserves.current_year;
        reserves_nextYear = reserves.next_year;
        calendary_currentYear = prices.current_year;
        calendary_nextYear = prices.next_year;
    },



    date_reserveSplit: function(date:string){
        let dateSplit = date.split('-');
        let result = {
            day : parseInt(dateSplit[2]),
            mounth : parseInt(dateSplit[1])-1,
            year : parseInt(dateSplit[0])
        }
        return result;
    },



    checkDate_reserve: function(checkIn:any, checkOut:any){
          let message_oldDate = language.calendary.old_date;
          let message_error = language.calendary.invalid_date;

          if(checkIn.year > checkOut.year){
            return message_error;
          }else if(checkIn.year == checkOut.year && checkIn.mounth > checkOut.mounth){
            return message_error;
          }else if(checkIn.year == checkOut.year && checkIn.mounth == checkOut.mounth && checkIn.day > checkOut.day){
            return message_error;
          }else{
            if(checkIn.year == current_year && checkIn.mounth+1 == current_mounth && checkIn.day < current_day){
                return message_oldDate;
              }else if(checkIn.year == current_year && checkIn.mounth+1 < current_mounth){
                return message_oldDate;
              }else if( checkIn.year < current_year){
                return message_oldDate;
              }
          }
          return true;
    },



    counter_reserve: function(counter:number, extra:any, checkIn:any){
        let current_mounth = new Date().getMonth();
        let limit_mounth = extra.limit_mounthReserve;
        let limit = false;
        if(checkIn.year == current_year){
            if(checkIn.mounth-current_mounth <= limit_mounth){
                limit = true;
            }
        }else if(checkIn.year == next_year){
            let difference = 11 - current_mounth;
            if(difference+checkIn.mounth <= limit_mounth){
                limit = true;
            }
        }
   
       if(limit){
        let min_reserve = extra.reserve_days.min;
        let max_reserve = extra.reserve_days.max;
        if(counter < min_reserve){
            let message = `${min_reserve} ${language.nights}`;
            if(min_reserve == 1){ message = `1 ${language.night}`; }
            return `${language.calendary.valid_for} ${message}`;
        }else if(counter > max_reserve){
            return `${language.calendary.valid_max} ${max_reserve} ${language.nights}`;
        }else{
            return true;
        }    

       }else{
        return `${language.calendary.valid_to} ${limit_mounth} ${language.mounths}`;
    } 
          
    },



    verify_reserve(reserve:Array<any>, id:string){
        let result = false;
        reserve.some(e=>{
            if(typeof(e) == 'boolean' && !e || e == 0 || typeof(e) == 'string' && e != id ){
               result = true;
            }            
        })
        
        return result;
    },




    get_date_reserve: function(first_date:string, second_date:string, extra:any, id:string, discount:any, clean:number){
        this.setLanguage();
        let message = language.calendary.dates_blocked;
        let checkIn = this.date_reserveSplit(first_date);
        let checkOut = this.date_reserveSplit(second_date);
        let check_reserve = [];
        let counter = 0;
        let total_cost = 0;
        
        /////     verifica inserimento data corretta   //////
        if(typeof(this.checkDate_reserve(checkIn, checkOut)) == 'string')    return this.checkDate_reserve(checkIn, checkOut);

        //////////  settare calendari   /////////
        let set_calendaryReserves = reserves_currentYear;
        if(checkIn.year == next_year){  set_calendaryReserves = reserves_nextYear;  }

        let set_calendaryPrices = calendary_currentYear;
        if(checkIn.year == next_year){ set_calendaryPrices = calendary_nextYear;  }
        //////////////////////////////////////////

        ///////////      stesso mese    ////////////////////////
      if(checkIn.year == checkOut.year && checkIn.mounth == checkOut.mounth && checkIn.day < checkOut.day){   
          
           for(let i=checkIn.day; i<checkOut.day; i++){
            check_reserve.push( set_calendaryReserves[checkIn.mounth][i] );
            counter++;
          }

        if(typeof(this.counter_reserve(counter, extra, checkIn)) == 'string'){
            return this.counter_reserve(counter,  extra, checkIn);
        }else{
            if(this.verify_reserve(check_reserve,id)){
                return message;
            }else{
                for(let i=checkIn.day; i<checkOut.day; i++){
                    set_calendaryReserves[checkIn.mounth][i] = id;
                    total_cost += set_calendaryPrices[checkIn.mounth][i];
                }
           } 
        }  

           ///////////      mese diverso, stesso anno    ////////////////////////
        }else if(checkIn.year == checkOut.year && checkIn.mounth < checkOut.mounth){      

            for(let x=checkIn.mounth; x<=checkOut.mounth; x++){
                 if(x == checkIn.mounth){
                    for(let i=checkIn.day; i<=this.total_days_mounth(checkIn.year)[x]; i++){
                        check_reserve.push( set_calendaryReserves[x][i] );
                        counter++;
                    }
                 }else if(x == checkOut.mounth){
                    for(let i=1; i<checkOut.day; i++){
                        check_reserve.push( set_calendaryReserves[x][i] );
                        counter++;
                    }
                 }
             }

             if(typeof(this.counter_reserve(counter,  extra, checkIn)) == 'string'){
                return this.counter_reserve(counter,  extra, checkIn);
            }else{
                if(this.verify_reserve(check_reserve,id)){
                    return message;
                }else{
                    for(let x=checkIn.mounth; x<=checkOut.mounth; x++){
                        if(x == checkIn.mounth){
                           for(let i=checkIn.day; i<=this.total_days_mounth(checkIn.year)[x]; i++){
                            set_calendaryReserves[x][i] = id;
                            total_cost += set_calendaryPrices[x][i];
                           }
                        }else if(x == checkOut.mounth){
                           for(let i=1; i<checkOut.day; i++){
                            set_calendaryReserves[x][i] = id;
                            total_cost += set_calendaryPrices[x][i];
                           }
                        }
                    }
               } 
            }  

         ///////////      mese diverso, anno diverso    ////////////////////////
        }else if(checkIn.year == current_year && checkOut.year == next_year && checkIn.mounth == 11 && checkOut.mounth == 0){
          
            for(let x=0; x<1; x++){
                   for(let i=checkIn.day; i<=31; i++){
                       check_reserve.push( reserves_currentYear[11][i] );
                       counter++;
                   }
           
                   for(let i=1; i<checkOut.day; i++){
                       check_reserve.push( reserves_nextYear[0][i] );
                       counter++;
                   }
            }

          if(typeof(this.counter_reserve(counter,  extra, checkIn)) == 'string'){
                return this.counter_reserve(counter,  extra, checkIn);
            }else{
                if(this.verify_reserve(check_reserve,id)){
                    return message;
                }else{
                   
            for(let x=0; x<1; x++){
                for(let i=checkIn.day; i<=31; i++){
                    reserves_currentYear[11][i] = id;
                    total_cost += calendary_currentYear[11][i];
                }
        
                for(let i=1; i<checkOut.day; i++){
                    reserves_nextYear[0][i] = id;
                    total_cost += calendary_nextYear[0][i];
                }
            }
            } 
         }  
        }

        let set_discount = false;
        let discountValue = 0;
        let final_cost = total_cost;
        if(counter >= discount.days){
           discountValue = total_cost*(discount.value_percentage/100);
           final_cost = total_cost-discountValue;
           set_discount = true;
        }

        let reserve = {
            nights : counter,
            discount : {
                set : set_discount,
                value : discountValue
            },
            cost : {
                total_cost : total_cost,
                discounted_cost : final_cost,
                final_cost : final_cost + clean
            },
            calendary_home : {
                prices : {
                    current_year : calendary_currentYear,
                    next_year : calendary_nextYear 
                },
                reserves : {
                    current_year : reserves_currentYear,
                    next_year : reserves_nextYear
                }
            }
         }
         return reserve;
    },



    resetCalndary: function(id:string){
        function resetBucle(calendary:any, limit:Array<number>){
            for(let x=0; x<12; x++){
                for(let i=1; i<=limit[x]; i++){
                    if(typeof(calendary[x][i]) == 'string' &&  calendary[x][i] == id){
                        calendary[x][i] = true;
                    }
                }
               }
        }
        resetBucle(reserves_currentYear, this.total_days_mounth(current_year));
        resetBucle(reserves_nextYear, this.total_days_mounth(next_year));
    },



    advancesValues: function(reserve:any){
        let advance = reserve.cost.final_cost*(reserve.advance.value/100);
        let advance_rest =  reserve.cost.final_cost - advance;
        let result = {
            value_advance:  advance,
            rest_advance: advance_rest,
        }
        return result;
    },




    date_limitRefund: function(limit:number, date:string){
         let checkIn = this.date_reserveSplit(date);
         let mounth = checkIn.mounth+1;

         let result = "";

         if(checkIn.day >= 6){
            result = `${checkIn.day-limit}/${mounth}/${checkIn.year}`;
         }else{
            let counter = 0;
            for(let i=checkIn.day; i>0; i--){
                counter++
            }
            let rest = limit-counter;
            if(checkIn.mounth > 0){
                let previousMounth = checkIn.mounth-1;
                let day = this.total_days_mounth(checkIn.year)[previousMounth] - rest;
                result = `${day}/${mounth}/${checkIn.year}`;
            }else{
                let day = this.total_days_mounth(checkIn.year)[11] - rest;
                result = `${day}/${12}/${checkIn.year-1}`;
            }
         }


         if(checkIn.mounth+1 == current_mounth && checkIn.day == current_day || checkIn.mounth+1 == current_mounth && checkIn.day-current_day < limit ){
            result = `${current_day}/${mounth}/${checkIn.year}`;
        
        }else if(checkIn.mounth+1 == current_mounth+1){
            let check_limit =  (this.total_days_mounth(checkIn.year)[checkIn.mounth] - current_day) - checkIn.day;
            if(check_limit < limit){
                 result = `${current_day}/${mounth}/${checkIn.year}`;
            } 
        } 

         return result;
    },


    /*     CALENDARIO CHE MOSTRA LA DISPONIBILITA' DELLE PRENOTAZIONI   */

    checkDates(year:number, mounth:number, day:number){
        let result = false;
        if(year == current_year){
            if(mounth < current_mounth){
                result = true;
            }else if(mounth == current_mounth && day < current_day){
                result = true;
            }
        }
        return result;
    },




    /*    RIMBORSI    */

    refund_filter(checkIn:string, checkOut:string){
        let date = this.date_reserveSplit(checkIn);
        let dateExpiration = this.date_reserveSplit(checkOut);

        let result = {filter:false, expiration:false};

        if(dateExpiration.year == current_year && dateExpiration.mounth+1 == current_mounth && dateExpiration.day < current_day){
            result.expiration = true; 
                
        }else if(dateExpiration.year == current_year && dateExpiration.mounth+1 < current_mounth){
            result.expiration = true;
        }else{
            if(date.year == current_year && date.mounth+1 > current_mounth){
                result.filter =  true;                
             }else if(date.year == current_year && date.mounth+1 == current_mounth && date.day >= current_day){
                 result.filter =  true;
             }else if(date.year == next_year){
                 result.filter = true;
             } 
        }

        return result;
    },



    check_refund(date:string){
        let current_day = new Date().getDate();
        let limit_refund = date.split('/');
        let limit_day = parseInt(limit_refund[0]);
        let limit_mounth = parseInt(limit_refund[1]);
        let limit_year = parseInt(limit_refund[2]);

        let result = false;
        
            if(limit_year == current_year && limit_mounth > current_mounth){
                result = true;    
            }else if(limit_year == current_year && limit_mounth == current_mounth && limit_day >= current_day){
                result = true;            
            }else if(limit_year == next_year){
                result = true;    
            }
        
        return result;
    },



    refund(first_date:string, second_date:string){
        let checkIn = this.date_reserveSplit(first_date);
        let checkOut = this.date_reserveSplit(second_date);

        let set_calendary = reserves_currentYear;
        if(checkIn.year == next_year)    set_calendary = reserves_nextYear;

        if(checkIn.year == current_year && checkOut.year == current_year){
            if(checkIn.mounth == checkOut.mounth){
                for(let i=checkIn.day; i<checkOut.day; i++){
                    set_calendary[checkIn.mounth][i] = true;
                }
            }else if(checkIn.mounth == checkOut.mounth-1){
                for(let i=checkIn.day; i<this.total_days_mounth(checkIn.year)[checkIn.mounth]; i++){
                    set_calendary[checkIn.mounth][i] = true;
                }

                for(let i=1; i<checkOut.day; i++){
                    set_calendary[checkOut.mounth][i] = true;
                }
            }
        }else if(checkIn.year == current_year && checkOut.year == next_year){
            for(let i=checkIn.day; i<31; i++){
                reserves_currentYear[11][i] = true;
            }

            for(let i=1; i<checkOut.day; i++){
                reserves_nextYear[0][i] = true;
            }
        }   

        let result = {
            prices : {
                current_year : calendary_currentYear,
                next_year : calendary_nextYear
            },
            reserves : {
                current_year : reserves_currentYear,
                next_year : reserves_nextYear
            }
        }

        return result;
    }

    
    
}