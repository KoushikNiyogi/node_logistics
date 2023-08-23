const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    email : String,
    password : String,
    name : String,
    city : String
})

const customerModel = mongoose.model("customer",customerSchema)

module.exports = {
    customerModel
}