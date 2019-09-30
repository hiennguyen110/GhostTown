const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/USER?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
const USER_ACCOUNT_INFO_SCHEMA = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String, 
    userEmail: String
});

const USER_ACCOUNT_INFO = mongoose.model("USER_INFORMATION", USER_ACCOUNT_INFO_SCHEMA);

const insert_user_info = function(username, firstName, lastName, userEmail){
    const new_user = new USER_ACCOUNT_INFO({
        username: username,
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail
    }); 
    return new_user.save();
}

module.exports = {
    insert_user_info: insert_user_info
}