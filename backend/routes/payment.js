const router = require("express").Router();
const Transaction = require("../models/Transaction");
const { v4: uuid } = require("uuid");

router.post("/pay", async(req,res)=>{

const fraudScore = Math.random()*100;

let status="Success";

if(fraudScore>80)
status="Fraud Suspected";

const transaction = new Transaction({

...req.body,

transactionId:uuid(),

fraudScore,
status

});

await transaction.save();

res.json(transaction);

});

router.get("/", async(req,res)=>{

const data = await Transaction.find();

res.json(data);

});

module.exports = router;