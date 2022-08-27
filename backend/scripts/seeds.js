console.log("hello");
require("../models/User");
require("../models/Item");
require("../models/Comment");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");

seed();

async function seed() {
    await User.deleteMany();
    await Item.deleteMany();
    await Comment.deleteMany();
    await seedInner();
    process.exit(0);
}

async function seedInner() {
    const total = 100;

    for (var i = 0; i < total; i++) {
        const userSlug = "test" + i;
    
        const user = new User();
        user.username = userSlug;
        user.email = userSlug + "@anythink.com";
        user.setPassword(userSlug);
        await user.save();

        const item = new Item();
        item.slug = user.username;
        item.title = "Item title " + userSlug;
        item.seller = user;
        await item.save();

        const comment = new Comment();
        comment.body = "This is a comment";
        comment.item = item;
        comment.seller = item.seller;
        await comment.save();

        console.log(userSlug + " creation completed");
        
    }
}