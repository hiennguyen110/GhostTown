const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const server = express();
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));

// Passport
server.use(session({
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/USER?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
const USER_ACCOUNT_LOGIN_SCHEMA = new mongoose.Schema({
    username: String,
    password: String,
});
USER_ACCOUNT_LOGIN_SCHEMA.plugin(passportLocalMongoose);

const USER_ACCOUNT_LOGIN = mongoose.model("USER_LOGIN", USER_ACCOUNT_LOGIN_SCHEMA);

passport.use(USER_ACCOUNT_LOGIN.createStrategy());
passport.serializeUser(USER_ACCOUNT_LOGIN.serializeUser());
passport.deserializeUser(USER_ACCOUNT_LOGIN.deserializeUser());

// End of passport

server.get("/", function(req, res){
    if (req.isAuthenticated()){
        console.log("User is authenticated !!!");
        res.render("index");
    } else {
        console.log("User is not authenticated !!!");
        res.redirect("/page-login");
    }
});

server.post("/", function(req, res){
    res.render("index");
});

server.get("/index", function(req, res){
    res.redirect("/");
})

server.post("/index", function(req, res){
    res.redirect("/");
});

server.get("/page-signup", function(req, res){
    res.render("page-signup");
});

server.post("/page-signup", function(req, res){
    USER_ACCOUNT_LOGIN.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            if (err.name == "UserExistsError"){
                console.log("Username is already taken !!!");
                res.redirect("/page-signup");
            } else {
                res.redirect("/page-signup");      
            }
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    })
});

server.get("/page-login", function(req, res){
    if (req.isAuthenticated()){
        res.redirect("/");
    } else {
        res.render("page-login");
    }
});

server.post("/page-login", function(req, res){
    const user = new USER_ACCOUNT_LOGIN({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if (err){
            console.log(err);
        } else {
            passport.authenticate("local", {successRedirect: '/', failureRedirect: '/page-login'})(req, res, function(){
            });
        }
    });
});

server.get("/page-logout", function(req, res){
    req.logOut();
    res.redirect("/page-login");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log("GhostTown is now on port 3000");
});