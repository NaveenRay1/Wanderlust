const express= require("express");

const app = express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");

const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

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
// index route
app.get("/listings",async (req,res)=>{
const allListing = await Listing.find({});
res.render("listings/index.ejs",{allListing});
})
// show route
app.get("/listings/:id",async (req,res)=>{
        let {id}=req.params;
        const listing= await Listing.findById(id);
        res.render("listings/show",{listing});
})





//  app.get("/listingTesting",async (req,res)=>{
//         let sample=new Listing({
//             title:"MY home",
//             description:"Near beach",
//             price:120000,
//             location:"GOA",
//             country:"INDIA"
//         });
//        await sample.save();
//        console.log("sample was saved");
//        res.send("testing successfull");
//  })