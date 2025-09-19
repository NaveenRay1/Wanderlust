const express = require("express");

const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/expressError.js");
const path = require("path");
const { error } = require("console");
const Review = require("./models/review.js");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');
const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.listen(8080, (req, res) => {
  console.log("listening at port 8080");
});

app.get("/", (req, res) => {
  res.send("aggye swagat h aapka");
});
// validate function

//validate for Schema

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode=505, message="something went wrong" } = err;
  res.status(statusCode).render("error.ejs",{message});
});


