const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://dbuser:Lokesh*2005@fooddelivery.nse7y6h.mongodb.net/");

mongoose.connection.on("connected",()=>{
    console.log("MongoDB Connected");
});

module.exports = mongoose;