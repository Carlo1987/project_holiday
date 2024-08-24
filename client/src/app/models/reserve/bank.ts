
const Data = new Date();

export const payment_bank = {
    type:"bank",  
    hour : `${Data.getDate()}/${Data.getMonth()+1}/${Data.getFullYear()} - ${Data.getHours()}:${Data.getMinutes()}`
};