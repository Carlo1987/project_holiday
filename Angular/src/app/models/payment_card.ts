
import { Global } from "../services/global";

let language = Global.initial_language;

language = Global.setLanguage();



export const payment_card = {
    type:"card",
    number: language.reserves.number_card, 
    expiration:"MM/AA", 
    secure_code:"CVV", 
    email:language.reserves.example_email, 
};