const mongoose = require("../db");

const schema = new mongoose.Schema({

name:String,
email:String,
password:String,
role:String,
area:String

});

module.exports = mongoose.model("User",schema);