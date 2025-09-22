const express = require("express");

const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require('express-session');
const path = require("path");
const { error } = require("console"); 
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user.js");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');
const userRouter = require('./routes/user.js');
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

const sessionOptions = {
    secret : "supersecret",
    resave : false,
    saveUninitialized : true,
    cookie : {
      expires : 7 * 24* 60 * 60 * 1000,
      maxAge : 7 * 24* 60 * 60 * 1000,
      httpOnly : true,
    }
} ;


app.listen(8080, (req, res) => {
  console.log("listening at port 8080");
});

app.get("/", (req, res) => {
  res.send("aggye swagat h aapka");
});

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flas func
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
  next();
});
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",userRouter);
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode=505, message="something went wrong" } = err;
  res.status(statusCode).render("error.ejs",{message});
});


