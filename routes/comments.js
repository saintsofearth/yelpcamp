// COMMENTS ROUTES
var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware/index");

// Comments new    
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err || !campground) {
            req.flash("error", "Invalid Campground ID");
            return res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments create
router.post("/", middleware.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err || !campground) {
            req.flash("error", "Invalid Campground");
            return res.redirect("/campgrounds/" + req.params.id);
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                // add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // save comment
                comment.save();
                campground.comments.push(comment);
                campground.save();
                // console.log(comment);
                res.redirect("/campgrounds/"+campground._id);
            });
        }
    });
});

// Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Invalid Campground ID");
            return res.redirect("/campgrounds/" + req.params.id);
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("comments/edit", {comment: foundComment, campgroundID: req.params.id});
                }
            });
        }
    });
});

// Comment update route
router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Invalid Campground ID")
            return res.redirect("/campgrounds/" + req.params.id);
        } else {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
    
});

// Comment delete route
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Invalid Campground ID");
            return res.redirect("/campgrounds/" + req.params.id);
        } else {
            Comment.findByIdAndRemove(req.params.comment_id, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;