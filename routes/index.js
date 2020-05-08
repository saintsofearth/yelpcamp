// AUTHENTICATION ROUTES
var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    passport = require("passport");



router.get("/", function(req, res) {
    res.render("landing");
});

// New route
router.get("/register", function(req, res) {
    res.render("register");
});

// Create route
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            return res.render("register", {error: err.message});
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/campgrounds");
            });
        }
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});
// Create login
router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;