const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register",async(req,res)=>{

const hash = await bcrypt.hash(req.body.password,10);

const user = new User({
...req.body,
password:hash
});

await user.save();

res.json(user);

});

router.post("/login",async(req,res)=>{

const user = await User.findOne({
email:req.body.email
});

if(!user) return res.json(null);

const valid = await bcrypt.compare(
req.body.password,
user.password
);

if(!valid) return res.json(null);

res.json(user);

});

module.exports = router;