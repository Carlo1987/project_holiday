import { Calendary } from "./calendary";
import { italian } from "../language/italian";


export const Global = {
    url_acount: "http://localhost:3700/user",
    url_home: "http://localhost:3700/home",
    url_review: "http://localhost:3700/review",
    url_reserve: "http://localhost:3700/reserve",
    initial_language : italian,


    setLanguage(){
        if(sessionStorage.getItem('lang')){
            let language = JSON.parse(sessionStorage.getItem('lang')!);
            return language;
        }else{
            return italian;
        }
    },


    expiration: function(date:any){
        let result = false;
        let current_year = new Date().getFullYear();
        let current_mounth = new Date().getMonth()+1;
        let current_day = new Date().getDate();
        let current_hour = new Date().getHours();
        let current_minutes = new Date().getMinutes();     
        
        if(current_hour == date.hour && current_minutes >= date.minute && current_day == date.day && current_year == date.year && current_mounth == date.mounth){
            result = true;  
            
        }else if(current_hour > date.hour && current_day == date.day && current_year == date.year && current_mounth == date.mounth){
            result = true;
        }else if(current_day > date.day && date.hour >= 3  &&  current_year == date.year && current_mounth == date.mounth){
            result = true;
        }else if(current_year == date.year && current_mounth > date.mounth && date.day != 1){
            result = true;
        }else if(current_year > date.year && date.mounth != 1 && date.day != 1){
            result = true;
        }

        return result;  
    },



    create_sessionExpitation: function(){
        let newDate = new Date();
        let current_hour = newDate.getHours();
        let day = newDate.getDate();
        let mounth = newDate.getMonth()+1;
        let year = newDate.getFullYear();

        let hour_expiration =current_hour+3;

        if(hour_expiration >= 24){
            hour_expiration = hour_expiration-24;
            day = day+1;

            if(day > Calendary.total_days_mounth(year)[mounth-1]){
                day = 1;
                mounth= mounth+1;

                if(mounth == 13){
                    mounth = 1;
                    year = year+1;
                }
            }
        }

        let expiration = {
            day : day,
            mounth : mounth,
            year : year,
            hour : hour_expiration,
            minute : newDate.getMinutes()
        }
        return expiration;
    },


    session_create: function(element:any , expire:any){
        let data = {
            user: {
              _id : element.user._id,
              name : element.user.name,
              surname : element.user.surname,
              email : element.user.email,
              cell : element.user.cell,
              image: element.user.image,
              image_path: element.user.image_path,
              status : element.user.status,
              address : element.user.address,
              city : element.user.city,
              cap : element.user.cap
            },
            session: true,
            expiration: {
                day : expire.day,
                mounth : expire.mounth,
                year : expire.year,
                hour : expire.hour,
                minute : expire.minute
            }
           }

           return data;
    },



    session_update: function(user:any , date:any , new_expiration:any){
        let new_session:any = '';
        let result = false;
        let newDate = new Date();
        let hour = newDate.getHours();
        let day = newDate.getDate();
        let mounth = newDate.getMonth()+1;
        let year = newDate.getFullYear();


        if(day == date.day && mounth == date.mounth && year == date.year && date.hour-hour <= 2){
             result = true;
        }else if(date.day == day+1 && mounth == date.mounth && year == date.year && hour > date.hour){
             if(date.hour == 0 && hour >= 22 || date.hour == 1 && hour >= 23){
                result = true;
             }
        }else if(day == 31 || day == 30 || day == 28 || day == 29){
            if(date.day == 1 && date.mounth == mounth+1){
                if(date.hour == 0 && hour >= 22 || date.hour == 1 && hour >= 23){
                    result = true;
                 }
            }
        }else if(date.year == year+1 && mounth == 12 && date.mounth == 1){
            if(date.hour == 0 && hour >= 22 || date.hour == 1 && hour >= 23){
                result = true;
             }
        } 
        
        if(result){
            new_session =  {
                user: {
                    _id : user._id,
                    name : user.name,
                    surname : user.surname,
                    email : user.email,
                    cell : user.cell,
                    image: user.image,
                    image_path: user.image_path,
                    status : user.status,
                    address : user.address,
                    city : user.city,
                    cap : user.cap
                  },
                  session: true,
                  expiration: {
                    day : new_expiration.day,
                    mounth : new_expiration.mounth,
                    year : new_expiration.year,
                    hour : new_expiration.hour,
                    minute : new_expiration.minute
                  }
            }
        }
        return new_session;
    },



    if_session_admin: function(){
        let result = false;
        if(localStorage.getItem('user')){
            let data = JSON.parse(localStorage.getItem('user')!);
             if(data.user.status == 'admin'){
                result = true;
             }
        }
        return result;
    },



    token_expiration: function(date:string){
        let result = false;
        let currentHour = new Date().getHours();
        let currentMinutes = new Date().getMinutes();

        let dateSplit = date.split(':');
        let hour = parseInt(dateSplit[0]);
        let minutes = parseInt(dateSplit[1]);

        if(currentHour == hour && currentMinutes >= minutes+10){
            result = true;

        }else if(currentHour >= hour+1){
            result = true;

        }else if(hour == 23 && currentHour >= 0 && currentHour != 23){
            result = true;
        }

        return result;
    },



    type_file: function(type:string){
        let result = true;
        if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png' && type != 'image/webp' && type != 'image/gif'){
            result = false;
        }
        return result;
    },



    initial_beds_home: function(){
        let beds = {
            single_beds:0,
            doble_beds:0,
            sofa_beds:0,
            forniture_beds:0,
            bunk_beds:0,
        }
        return beds;
    },



    initial_details_home: function(){
        let details = {
            hairdryer: false,
            hot_water:false, 
            toilet_paper:false,
            washing_machine:false,
            dryer:false,
            iron:false,
            crib:false,
            chair_baby:false,
            box_baby:false,
            fireplace:false,
            air_conditioning:false,
            electric_fan:false,
            tv:false,
            refrigerator:false,
            microware:false,
            plate:false,
            pot:false,
            coffee_machine:false,
            wifi:false,
            balcony:false,
            courtyard:false,
            outdoor_food:false,
            barbecue:false,
            outdoor_forniture:false,
            parking:false,
            animal:false,
            smoke:false,
            reception:false,
            fire_prevention:false,
            monoxide:false,
         }
         return details;
    },



    average_reviews: function(assessments:Array<number>){
       let sum = assessments.reduce((a,b)=>a+b);
       let average = sum / assessments.length;
       return parseFloat(average.toFixed(1));
    },



    contodown_sessionReserve(expiration:string){
        let contdownSplit = expiration.split(':');
        let hour = parseInt(contdownSplit[0]);
        let minute = parseInt(contdownSplit[1]);

            let sum_minutes = minute+10;
            let sum_hours = hour+1;
            let result = `${hour}:${sum_minutes}`;

           if(sum_minutes >= 60){
              let sum_minutesSplit = sum_minutes.toString().split(''); 
              let minute = sum_minutesSplit[1];

              if(sum_minutes == 60)  minute = '0';

               result = `${sum_hours}:0${minute}`;

              if(sum_hours == 24)  result = `00:0${minute}`;
               
           }

        return result; 
     },



     expiration_countdown(value:string){
        let expirationSplit = value.split(':');
        let hour = parseInt(expirationSplit[0]);
        let minute = parseInt(expirationSplit[1]);
        let current_hour = new Date().getHours();
        let current_minute = new Date().getMinutes();

        let result = true;
        if(current_hour == hour && current_minute >= minute || current_hour > hour || current_hour == 0 && hour == 23){
            result = false;
        }
        return result;
      }


  
  
    
}