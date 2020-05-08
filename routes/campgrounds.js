var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware/index");

// 1.INDEX ROUTE
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        } 
    });
});

// 2. NEW ROUTE
router.get("/new", middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});


// 3. CREATE ROUTE
router.post("/", middleware.isLoggedIn,function(req, res) {
    // get data from form and add that data to campground arrays
    var name = req.body.name;
    var imageURL = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
        image: imageURL,
        price: price,
        description: desc,
        author: author
    }
    // create a new campground and save it to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


// 4. SHOW ROUTE
router.get("/:id", function(req, res) {
    // find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            return res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit campground route
router.get("/:id/edit", middleware.checkUserCampgroundOwnership,function(req, res) {
     Campground.findById(req.params.id, function(err, foundCampground) {
         if(err) {
             console.log(err);
         } else {
             res.render("campgrounds/edit", {campground: foundCampground});
         }
     });
});

// update campground route
router.put("/:id", middleware.checkUserCampgroundOwnership,function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// delete campground route
router.delete("/:id", middleware.checkUserCampgroundOwnership,function(req, res) {
    // console.log(req.params.id);
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

module.exports = router;