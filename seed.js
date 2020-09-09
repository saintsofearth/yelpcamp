var mongoose = require("mongoose"),
    Comment = require("./models/comment"),
    Campground = require("./models/campground");
    


var data = [
    {
        name: "Green Trees",
        image: "https://images.unsplash.com/photo-1587655043289-8b859ace49b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Bacon ipsum dolor amet spare ribs t-bone ribeye sirloin porchetta shank tail pork loin boudin frankfurter burgdoggen. Shankle bacon boudin ground round sausage jowl, ham hock venison pig swine spare ribs flank short ribs. Spare ribs strip steak chislic cupim shankle. Pork chop short loin meatloaf porchetta chislic picanha kevin brisket shoulder bacon bresaola tail salami tri-tip. Tri-tip pork ribeye, drumstick cow meatball ham pork loin bacon brisket rump spare ribs filet mignon capicola. Cupim brisket bresaola venison. Ribeye short ribs meatloaf shoulder. Spare ribs landjaeger meatball jowl fatback short loin, meatloaf tri-tip. Chicken short loin pastrami t-bone beef ribs tenderloin beef fatback cow flank tail chislic ground round picanha. Salami pork belly chuck, bresaola short loin cow porchetta meatball picanha prosciutto turkey pork chop. Pork loin drumstick leberkas, tenderloin buffalo ribeye capicola strip steak turkey salami shoulder rump ham cupim jowl. Ham tongue pancetta shoulder porchetta pork belly spare ribs short loin ribeye pork."
    },
    {
        name: "Flower",
        image: "https://images.unsplash.com/photo-1587612780437-aade86f472a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Bacon ipsum dolor amet spare ribs t-bone ribeye sirloin porchetta shank tail pork loin boudin frankfurter burgdoggen. Shankle bacon boudin ground round sausage jowl, ham hock venison pig swine spare ribs flank short ribs. Spare ribs strip steak chislic cupim shankle. Pork chop short loin meatloaf porchetta chislic picanha kevin brisket shoulder bacon bresaola tail salami tri-tip. Tri-tip pork ribeye, drumstick cow meatball ham pork loin bacon brisket rump spare ribs filet mignon capicola. Cupim brisket bresaola venison. Ribeye short ribs meatloaf shoulder. Spare ribs landjaeger meatball jowl fatback short loin, meatloaf tri-tip. Chicken short loin pastrami t-bone beef ribs tenderloin beef fatback cow flank tail chislic ground round picanha. Salami pork belly chuck, bresaola short loin cow porchetta meatball picanha prosciutto turkey pork chop. Pork loin drumstick leberkas, tenderloin buffalo ribeye capicola strip steak turkey salami shoulder rump ham cupim jowl. Ham tongue pancetta shoulder porchetta pork belly spare ribs short loin ribeye pork."
    },
    {
        name: "Green Body of Water",
        image: "https://images.unsplash.com/photo-1587632801365-b160b1c40551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2009&q=80",
        description: "Bacon ipsum dolor amet spare ribs t-bone ribeye sirloin porchetta shank tail pork loin boudin frankfurter burgdoggen. Shankle bacon boudin ground round sausage jowl, ham hock venison pig swine spare ribs flank short ribs. Spare ribs strip steak chislic cupim shankle. Pork chop short loin meatloaf porchetta chislic picanha kevin brisket shoulder bacon bresaola tail salami tri-tip. Tri-tip pork ribeye, drumstick cow meatball ham pork loin bacon brisket rump spare ribs filet mignon capicola. Cupim brisket bresaola venison. Ribeye short ribs meatloaf shoulder. Spare ribs landjaeger meatball jowl fatback short loin, meatloaf tri-tip. Chicken short loin pastrami t-bone beef ribs tenderloin beef fatback cow flank tail chislic ground round picanha. Salami pork belly chuck, bresaola short loin cow porchetta meatball picanha prosciutto turkey pork chop. Pork loin drumstick leberkas, tenderloin buffalo ribeye capicola strip steak turkey salami shoulder rump ham cupim jowl. Ham tongue pancetta shoulder porchetta pork belly spare ribs short loin ribeye pork."
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds!");
            //Add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("campground ground added")

                        // create a comment
                        Comment.create({
                            text: "This place is great, but no internet.",
                            author: "Mouse"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campgroundconsole.log("Removed campgrounds!");
                                //Add a few campgrounds
                                data.forEach(function(seed) {
                                    Campground.create(seed, function(err, campground) {
                                        if(err) {
                                            console.log(err);
                                        } else {
                                            console.log("campground ground added")
                    
                                            // create a comment
                                            Comment.create({
                                                text: "This place is great, but no internet.",
                                                author: "Mouse"
                                            }, function(err, comment) {
                                                if(err) {
                                                    console.log(err);
                                                } else {
                                                    campground.comments.push(comment);
                                                    campground.save();
                                                    console.log("created a new comment");
                                                }
                                                
                    
                                            });
                                        }
                                    });
                                });
                            }.save();
                                console.log("created a new comment");
                            }
                            

                        });
                    }
                });
            });
        }
    });


    //Add a few comments
}


module.exports = seedDB;
