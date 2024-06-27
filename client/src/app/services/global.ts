import { Calendary } from "./calendary";
import { italian } from "../language/italian";

const host = "http://localhost:3700";
const front = "http://localhost:4200";  

/* const host = "http://109.176.199.142:3700";
const front = "http://109.176.199.142:3700";  */

export const Global = {
  
    url : host,
    url_acount: host+"/user",
    url_home: host+"/home",
    url_review: host+"/review",
    url_reserve: host+"/reserve",

    url_home_front : front+'/home',
    url_index_front : front,



    getIdentity(){
        let identity = { status : false , user : null};
        
        if(localStorage.getItem('user')){
             identity = {
                status : true,
                user : JSON.parse(localStorage.getItem('user')!).user
            }; 
        }

        return identity;
    },



    getToken(){
        let result = null;
        if(localStorage.getItem('token')){
            result = localStorage.getItem('token')
        }
        return result;
    },


    setLanguage(){
        if(sessionStorage.getItem('lang')){
            let language = JSON.parse(sessionStorage.getItem('lang')!);
            return language;
        }else{
            return italian;
        }
    },



    validateEmail(email:string){
        let validate = false;

        const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    
        if (email.match(EMAIL_REGEX)){
          validate = true;   
        }
        return validate;
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




    average_reviews: function(assessments:Array<number>){
       let sum = assessments.reduce((a,b)=>a+b);
       let average = sum / assessments.length;
       return parseFloat(average.toFixed(1));
    },



    expiration_sessionReserve(){
         let hour = new Date().getHours();
         let minutes = new Date().getMinutes();

         minutes = minutes+10;
         if(minutes >= 60){
            minutes = minutes-60;
            hour++;
         }

         if(hour >= 24){
            hour = hour-24;
         }

         return hour+':'+minutes;
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