const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = Schema({
    name:String,
    city:String,
    address:String,
    cap:String,
    avatar:String,
    meters:Number,
    rooms:Number,
    beds: {
        single_beds:Number,
        doble_beds:Number,
        sofa_beds:Number,
        forniture_beds:Number,
        bunk_beds:Number
    },
    guests:Number,
    baths:Number,
    description:String,
    images:[],
    details: {
        hairdryer:Boolean,
        hot_water:Boolean, 
        toilet_paper:Boolean,
        washing_machine:Boolean,
        dryer:Boolean,
        iron:Boolean,
        crib:Boolean,
        chair_baby:Boolean,
        box_baby:Boolean,
        fireplace:Boolean,
        air_conditioning:Boolean,
        electric_fan:Boolean,
        tv:Boolean,
        refrigerator:Boolean,
        microware:Boolean,
        plate:Boolean,
        pot:Boolean,
        coffee_machine:Boolean,
        wifi:Boolean,
        balcony:Boolean,
        courtyard:Boolean,
        outdoor_food:Boolean,
        barbecue:Boolean,
        outdoor_forniture:Boolean,
        parking:Boolean,
        animal:Boolean,
        smoke:Boolean,
        reception:Boolean,
        fire_prevention:Boolean,
        monoxide:Boolean
    },
    calendary_prices: {
         prices: {
            current_year :   {}, 
            next_year :   {} 
        },
        reserves: {
            current_year :   {}, 
            next_year :   {} 
        } 
       
    }
});

module.exports = mongoose.model('Home',HomeSchema); 