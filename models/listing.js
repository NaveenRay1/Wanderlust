const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const listingSchema =new Schema({
    title :{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        filename:{
             type:String,
        },
        url:{
            type:String,
        set:(v)=> v===""? "https://media.istockphoto.com/id/2170792772/photo/spa-by-sea-against-sky-during-sunset.jpg?s=1024x1024&w=is&k=20&c=psh_O_ccYhpvJuS74FV46Z5tv7hWl9QbBYByB4wBayA=":v,

        }
        

    },
    price : Number,
    location:String,
    country:String

})
const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;