
import { italian } from "../language/italian";

const host = "http://localhost:3700";
const front = "http://localhost:4200";  

/* 
const host = "http://109.176.199.142:3700";
const front = "http://109.176.199.142:3700";  
*/

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
    



  
     expiration(value:string){                                            /*  espirazione sessioni  */
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
      },  
 




    countHours(limit:number){                          /*   funzione per conteggiare la differenza di ore e minuti   */
        let hour = 0;
        let minute = 0;

        for(let i=1; i<=limit; i++){
            minute++;
            if(minute == 60){
                minute = 0;
                hour++
            }            
        }

        return {
            hour : hour,
            minute : minute
        }
    },


   
   create_expiration_sessions(limit:number){                                      /*   creazione espirazione sessioni varie  */         
    /// limit sono minuti
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let value_limit = this.countHours(limit);

        hour = hour + value_limit.hour;
        minutes = minutes + value_limit.minute;

        if(hour >= 24){
            hour = hour-24;
        } 

        return hour+':'+minutes;
    },    




    session_create: function(element:any , expire:any){                                       /*    creazione sessione utente loggato   */

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
            expiration: expire
           }

           return data;
    }, 



    session_update(expiration:string){                                                /*   funzione per aggiornamento sessione utente   */
        let expSplit = expiration.split(':');
        let exp_hour = parseInt(expSplit[0]); 
        let hour = new Date().getDate();
    
        let result = false;

        if(exp_hour - hour <= 2){
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




    createID: function(){
        let id = "NOLOGIN";
        for(let i=0; i<12; i++){
          id += Math.round(Math.random()*9);
        }
        return id;
      }




  
  
    
}