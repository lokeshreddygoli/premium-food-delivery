const mongoose = require("../db");

const schema = new mongoose.Schema({

userId:String,
orderId:String,

amount:Number,

transactionId:String,

fraudScore:Number,

status:String,

date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Transaction",schema);