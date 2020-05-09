var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    session = require("express-session"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/index");
    
// ************ TRIAL-ERROR-DRIVEN-DEVELOPMENT *********
// seedDB();
// *****************************************************

// APP CONFIGURATION
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: "apoorv",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// PASSPORT CONFIGURATION
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MONGOOSE CONFIGURATION
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// console.log(process.env.DATABASEURL);
// My localhost DB url: mongodb://localhost/yelecamp
mongoose.connect(process.env.DATABASEURL, {'useNewUrlParser': true});

// **************** USING ROUTES ********************
app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// **************** SERVER *************************
app.listen(process.env.PORT || 3000, function() {
    console.log("YeleCamp Server Started...");
})