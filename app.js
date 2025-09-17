const express= require("express");

const app = express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");

const path = require('path');
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

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
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})
// show route
app.get("/listings/:id",async (req,res)=>{
        let {id}=req.params;
        const listing= await Listing.findById(id);
        res.render("listings/show",{listing});
})
//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
})
//update route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})
// create post route
app.post("/listings",(req,res)=>{
    
    let newListing= new Listing(req.body.listing);
    newListing.save();
    res.redirect("/listings");
})
//delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
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