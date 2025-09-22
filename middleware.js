module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticate()){
        req.flash("error", "you must be logged in first !");
        return res.redirect("/login");
    }
    next();
}