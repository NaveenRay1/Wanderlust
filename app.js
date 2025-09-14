const express= require("express");

const app = express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const MONGO_URL= "mongodb://127.0.0.1:27017/WanderLust";
main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.listen(8080,(req,res)=>{
    console.log("listening at port 8080");
})

app.get("/",(req,res)=>{
    res.send("aggye swagat h aapka");
})
 app.get("/listingTesting",async (req,res)=>{
        let sample=new Listing({
            title:"MY home",
            description:"Near beach",
            price:120000,
            location:"GOA",
            country:"INDIA"
        });
       await sample.save();
       console.log("sample was saved");
       res.send("testing successfull");
 })