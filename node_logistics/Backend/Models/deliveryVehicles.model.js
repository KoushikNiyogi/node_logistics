const mongoose = require("mongoose")

const deliveryvehicleSchema = mongoose.Schema({
    city: { type: String, required: true },
    vehicleType: { type: String, enum: ["bike", "truck"], required: true },
    activeOrdersCount: {
        type: Number,
        default: 0,
        min: 0,
        max: 2,
    },
})

const deliveryvehicleModel = mongoose.model("deliveryVehicle",deliveryvehicleSchema)

module.exports = {deliveryvehicleModel}