
export class Home {

    constructor(
       public  name:String,
       public  city:String,
       public  address:String,
       public  cap:String,
       public  meters:Number,
       public  rooms:Number,
       public  baths:Number,
       public  description:String,

       ////// letti    /////
       public beds:any,

       ///////   dettagli  /////////
       public details:any,

       ///// calendari prezzi /////
       public calendary_prices:any
    ){}
}