const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.DATABASE_API, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
const USER_POST_SCHEMA = new mongoose.Schema({
    author: String,
    post_category: String,
    post_title: String,
    post_content: String
});

const USER_POST = mongoose.model("USER_INFORMATION", USER_POST_SCHEMA);

const create_new_post = function(author, post_category, post_title, post_content){
    const new_post = new USER_POST({
        author: author,
        post_category: post_category,
        post_title: post_title,
        post_content: post_content
    }); 
    return new_post.save();
}

module.exports = {
    create_new_post: create_new_post
}
