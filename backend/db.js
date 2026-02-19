const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected",()=>{
    console.log("MongoDB Connected");
});

module.exports = mongoose;