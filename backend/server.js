const express = require("express");
const cors = require("cors");

require("./db");

const auth = require("./routes/auth");
const food = require("./routes/food");
const order = require("./routes/order");
const payment = require("./routes/payment");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth",auth);
app.use("/food",food);
app.use("/order",order);
app.use("/payment",payment);

app.listen(5000,()=>{
console.log("Server running");
});