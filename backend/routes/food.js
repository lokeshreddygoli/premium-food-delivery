const router = require("express").Router();
const Food = require("../models/Food");

router.get("/", async(req,res)=>{
const data = await Food.find();
res.json(data);
});

router.post("/add", async(req,res)=>{
const food = new Food(req.body);
await food.save();
res.json(food);
});

router.delete("/:id", async(req,res)=>{
await Food.findByIdAndDelete(req.params.id);
res.json("Deleted");
});

module.exports = router;