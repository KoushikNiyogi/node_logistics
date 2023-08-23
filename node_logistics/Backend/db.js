const mongoose = require("mongoose");
require("dotenv").config();

const connect_DB = mongoose.connect(process.env.MONGOURL)

module.exports = {
    connect_DB
}