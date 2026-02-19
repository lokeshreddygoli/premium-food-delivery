const mongoose = require("../db");

const schema = new mongoose.Schema({

userId:String,
foodId:String,
restaurant:String,
area:String,

price:Number,

deliveryCharge:Number,

groupEnabled:Boolean,

groupId:String,

discount:Number,

status:{
type:String,
default:"Waiting"
},

date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Order",schema);