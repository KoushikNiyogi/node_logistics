const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    orderNumber : {type : String},
    itemID: { type: String },
    price: { type: Number },
    customerID: { type: String },
    deliveryVehicleID: { type: String },
    isDelivered: { type: Boolean }
})

orderSchema.pre("save", async function (next) {
    try {
        const latestOrder = await orderModel.find();

        let nextOrderNumber = latestOrder.length+1; 

        const orderNumberLength = nextOrderNumber.toString().length;

        const desiredTotalLength = 5; 

        const zerosToPad = Math.max(0, desiredTotalLength - orderNumberLength);

        const paddedOrderNumber = '0'.repeat(zerosToPad) + nextOrderNumber.toString();

        this.orderNumber = paddedOrderNumber;
        next();
    } catch (error) {
        next(error);
    }
});

const orderModel = mongoose.model("order", orderSchema)

module.exports = { orderModel }