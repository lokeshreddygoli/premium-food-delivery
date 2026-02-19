const mongoose = require("../db");

const schema = new mongoose.Schema({

name:String,
price:Number,
image:String,
restaurant:String

});

module.exports = mongoose.model("Food",schema);