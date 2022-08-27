console.log("hello");
require("../models/User");
require("../models/Item");
require("../models/Comment");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");

User.deleteMany().then(() => {
    Item.deleteMany().then(() => {
        Comment.deleteMany().then(() => {
            seed();
        })
    });
});

function seed() {
    const total = 100;

    for (var i = 0; i < total; i++) {
        const userSlug = "test" + i;
    
        const user = new User();
        user.username = userSlug;
        user.email = userSlug + "@anythink.com";
        user.setPassword(userSlug);
    
        user.save()
            .then(() => {
                const item = new Item();
                item.slug = user.username;
                item.title = "Item title " + userSlug;
                item.seller = user;

                item.save()
                    .then(() => {
                        const comment = new Comment();
                        comment.body = "This is a comment";
                        comment.item = item;
                        comment.seller = item.seller;

                        comment.save()
                            .then(() => {
                                console.log(userSlug + " creation completed");
                            })
                    });
            })
        
    }
}