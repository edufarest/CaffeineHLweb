let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);


