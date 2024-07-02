

const Data = new Date();

export const payment_card = {
    type:"card",
    number: "",   
    expiration: "",    
    secure_code: "",    
    email: "",       
    hour : `${Data.getDate()}/${Data.getMonth()+1}/${Data.getFullYear()} - ${Data.getHours()}:${Data.getMinutes()}`
};