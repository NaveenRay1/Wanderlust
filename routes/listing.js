const express = require('express');
const router = express.Router({mergeParams:true});
const {listingSchema, reviewSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    throw new ExpressError(400, error);
  }
  else next();
}
// index route
router.get("/",wrapAsync( async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}));
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});
// show route
router.get("/:id",wrapAsync( async (req, res) => {
   
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
   if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

  res.render("listings/show", { listing });
}));
//edit route
router.get("/:id/edit",wrapAsync( async (req, res) => {

  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
}));
//update route
router.put("/:id", validateListing, wrapAsync( async (req, res) => {
 
 let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success" , "Listing Updated");
  res.redirect("/listings");
}));
// create post route
router.post(
  "/", validateListing,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success" , "New Listing Created");
    res.redirect("/listings");
  })
);

//delete route
router.delete("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  // await Listing.findByIdAndDelete(id);
  let list =  await Listing.findById(id);
  for(let rev_id of list.reviews){
    await Review.findByIdAndDelete(rev_id);
  }
  await Listing.findByIdAndDelete(id);


req.flash("success" , "Listing Deleted");
  res.redirect("/listings");

}));

module.exports = router;