const env = require('../env');
const italian = require('./italian_text');
const espanol = require('./espanol_text');

const color_theme = "rgb(38, 126, 97)";
const container_style = 'style="width: 100%; font-size:18px;" '; 
const title_style = `style="width:100%;  text-align:center; font-size:23px !important; letter-spacing:1px; color:${color_theme}"; margin-bottom:10px;`;
const message_style = 'style="width:100%; text-align:center; margin-bottom:10px;"';



function mounth_names(){
    let mounths = ["Gennaio","Febraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
    return mounths;
}


function getDate(date){
    let dateSplit = date.split('-');
    let result = {
        day : parseInt(dateSplit[2]),
        mounth : parseInt(dateSplit[1])-1,
        year : parseInt(dateSplit[0])
    }
    return `${result.day} ${mounth_names()[result.mounth]} ${result.year}`;
}







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let email = {

    transport : env.transport_email,
    email_server : env.host_email,



    setLanguage : function(lang){
      let language = italian;

        if(lang == 'español'){
          language = espanol;
        }else{
          language = italian;
        }
        return language;
    },


    sendToken: function(code, language){
    const code_style = 'style="width: 100px; padding:10px; border: 1px solid black; border-radius: 10px; text-align:center; margin: 0 auto;"';
    let lang = this.setLanguage(language);
    let title = lang.send_token.object;

    let email = `
     <div ${container_style}>
          <h3 ${title_style}> ${lang.send_token.title} </h3> 
           <div ${message_style}> <p> ${lang.send_token.message} </p> </div> 
           <div ${code_style}> ${code} </div>
     </div> `;

     return {title , email , no_found : lang.send_token.no_found};
    },




 

    resetPassword: function(name, language){
      let lang = this.setLanguage(language);
      let title = lang.reset_password.title;
      let email = `
           <div ${container_style}>
               <h3 ${title_style}> ${lang.reset_password.title}! </h3>
               <div ${message_style}> <p> ${lang.good} ${name}, ${lang.reset_password.message}! </p> </div>
           </div>`;

           return {title, email , success : lang.reset_password.success};
    },



    reserve: function(reserve, id , language){
        let lang = this.setLanguage(language);
        let object = lang.reserve.title+ ' '+ lang.for;

        let avatar_home = reserve.home_data.avatar;
        let total_nights = reserve.total_nights + ' ' + lang.reserve.nights;
        if(reserve.total_nights == 1)   total_nights =  lang.reserve.night;
       
        let advance = `<span style='text-decoration: underline; font-size=20px;'> ${lang.reserve.payment_complete} </span>`;
        if(reserve.advance.set == "true"){
            advance = `${lang.reserve.advance} €${(reserve.advance.value_advance).toFixed(2)}, <U> ${lang.reserve.advance_rest} €${(reserve.advance.rest_advance).toFixed(2)} </U> ${lang.reserve.refund_date} ${reserve.refund.limit}`;
        }

        const main_style = " style='width:95%; margin: 0 auto;  padding:5px;' ";
        const header = " style='width:100%; margin-bottom:10px;' ";
        const title_header = `style='width:100%; text-align:center; font-size:24px; color:${color_theme}; letter-spacing: 1px; margin-bottom:5px;' `;
        const container_img = " style='width:95%; height:230px; margin:0 auto;' ";
        const img_style = " style='width:100%; height:100%; border-radius:8px;' ";
        const article_style = " style='width:95%; border:1px solid black; border-radius:10px; box-shadow:2px 2px 3px rgb(32, 32, 32); margin:0 auto; padding:8px; margin-bottom:5px;' ";
        const titleArticle_style = ` style='color:${color_theme}; font-size:20px; text-align:center;' `;
        const price_style = `style='font-size:20px; color:${color_theme}; font-weight: bold;' `;
   
       //  
        email =  ` 
         <div ${container_style}>

           <h3 ${title_style}>  ${lang.reserve.title}!  </h3>

           <div ${header}>
               ${lang.good} ${reserve.user_data.name}, ${lang.reserve.message}: 
           </div>


           <div ${main_style}>

              <div ${header}>
                 <h3 ${title_header}> ${reserve.home_data.name} </h3>
                 <div ${container_img}>  <img ${img_style} src='${env.host}/home/get_avatar/${avatar_home}' alt='Immagine_${reserve.home_data.name}'>  </div>
              </div>   

              <div ${article_style}>
                <h4 ${titleArticle_style}> Number order: <span style="color:black;">  ${id}  </span> </h4>
                <h4 ${titleArticle_style}> ${lang.reserve.user}: </h4>
                <p> ${reserve.user_data.surname} ${reserve.user_data.name} </p>
                <p> ${lang.reserve.tel}: ${reserve.user_data.cell} </p>
                <p> ${lang.reserve.email}: ${reserve.user_data.email} </p>
              </div>

              <div  ${article_style}>
                <h4 ${titleArticle_style}> ${lang.reserve.summary}: </h4>
                <p> ${lang.reserve.guests}: ${reserve.guests} </p>
                <p> Check-In : ${getDate(reserve.checkIn)} </p>
                <p> Check-Out : ${getDate(reserve.checkOut)} </p>
                <p> ${lang.reserve.total_nights} : ${total_nights} </p>
              </div>

              <div  ${article_style}>
                <h4 ${titleArticle_style}> ${lang.reserve.payments}: </h4>
                <p> ${lang.reserve.total_cost} <span ${price_style}> €${(reserve.cost.final_cost).toFixed(2)} </span> </p>
                <p> ${advance} </p>
              </div>

           </div>  

         </div>`;

         return {object , email};
    },



    completePayment: function(reserve, language){
      let lang = this.setLanguage(language);

      let object = lang.completePayment.title;

      let email =  `
      <div ${container_style}>
        <h3 ${title_style}> ${lang.completePayment.title} </h3>
        <div ${message_style}>
          <p> ${lang.good}  ${reserve.user_data.name}, ${lang.completePayment.message1}  €${(reserve.advance.rest_advance).toFixed(2)} ${lang.completePayment.message2}!! </p>
        </div>
      </div>
     `;

     return { object , email };
    },




    refund_cancelled: function(reserve, total_refund, language){
      let lang = this.setLanguage(language);

      let object = lang.refund.title;
  
   let message_refund = `${lang.refund.message1} €${(reserve.cost.final_cost).toFixed(2)}.`;
      if(reserve.advance.set == 'false' && !total_refund){
          message_refund = `${lang.refund.message2} €${(reserve.cost.final_cost/2).toFixed(2)}.`;
      }else if(reserve.advance.set == 'true' && total_refund){
          message_refund = `${lang.refund.message3} €${(reserve.advance.value_advance).toFixed(2)}.`;
      }else if(reserve.advance.set == 'true' && !total_refund){
        message_refund = `${lang.refund.message4} €${(reserve.advance.value_advance/2).toFixed(2)}.`;
      } 
   
      const img_style = "style='width:45px; height:42px; border-radius:900px; padding-top:8px;' ";
      let email =  `
       <div ${container_style}>
         <h3 ${title_style}> ${lang.refund.title}  </h3>
         <div ${message_style}>
          <p>${lang.refund.name} ${reserve.user_data.name} ${reserve.user_data.surname} ${lang.refund.delete}. ${message_refund} </p>
          <p> ${lang.refund.thanks} <strong>${env.cell}</strong> ${lang.refund.email} <a href='mailto:${env.email}'>${env.email}</a> </p>
           <p> ${lang.refund.soon}!! </p> 
         </div>
       </div>
      `;

      return { object , email };
    }





}

module.exports = email;