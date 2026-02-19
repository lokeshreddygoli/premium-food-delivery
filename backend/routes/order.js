const router = require("express").Router();
const Order = require("../models/Order");

router.post("/place", async(req,res)=>{

let deliveryCharge = 100;
let discount = 0;
let groupId = null;

if(req.body.groupEnabled){

const existing = await Order.findOne({
restaurant:req.body.restaurant,
area:req.body.area,
groupEnabled:true,
status:"Waiting"
});

if(existing){

groupId = existing.groupId;

const count = await Order.countDocuments({
groupId
});

deliveryCharge = 100/(count+1);

discount = req.body.price * 0.1;

}else{

groupId = Date.now().toString();

}

}

const order = new Order({

...req.body,
deliveryCharge,
discount,
groupId

});

await order.save();

res.json(order);

});

router.get("/", async(req,res)=>{

const orders = await Order.find();

res.json(orders);

});

module.exports = router;