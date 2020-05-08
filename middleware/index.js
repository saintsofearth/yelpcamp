var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = {};

middleware.checkUserCampgroundOwnership = function(req, res, next ) {
        // first check whether the user is at all logged in
            if(req.isAuthenticated()) {
                Campground.findById(req.params.id, function(err, foundCampground) {
                    if(err || !foundCampground) {
                        req.flash("error", "Invalid Campground ID");
                        return res.redirect("/campgrounds");
                    } else {
                        // if user is logged in check whether the current user matched to owner of campground
                        if(foundCampground.author.id.equals(req.user._id)) {
                            next();
                        } else {
                            req.flash("error", "You don't have owernship rights");
                            res.redirect("back");
                        }
                    }
                });
            } else {
                req.flash("error", "You need to login to do that");
                res.redirect("back");
            } 
        
}

middleware.checkCommentOwnership = function(req, res, next) {
    
        // first check whether the user is at all logged in
            if(req.isAuthenticated()) {
                Comment.findById(req.params.comment_id, function(err, foundComment) {
                    if(err || !foundComment) {
                        req.flash("error", "Invalid Comment ID");
                        return res.redirect("/campgrounds/" + req.params.id);
                    } else {
                        // if user is logged in check whether the current user matched to owner of campground
                        if(foundComment.author.id.equals(req.user._id)) {
                            next();
                        } else {
                            req.flash("error", "You don't have ownership rights");
                            res.redirect("back");
                        }
                    }
                });
            } else {
                req.flash("error", "You need to login to do that");
                res.redirect("back");
            } 
        
}

middleware.isLoggedIn = function(req, res, next) {

        if(req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to login to do that");
        res.redirect("/login");
}

module.exports = middleware;