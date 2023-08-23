const express = require("express");
const { customerModel } = require("../Models/customer.model");
const { deliveryvehicleModel } = require("../Models/deliveryVehicles.model");
const { orderModel } = require("../Models/order.model");
const { adminauth } = require("../Middleware/adminAuth");
const orderRoute = express.Router();


/*
 orderNumber : {type : String},
    itemID: { type: String },
    price: { type: Number },
    customerID: { type: String },
    deliveryVehicleID: { type: String },
    isDelivered: { type: Boolean }
*/
orderRoute.post("/add", async (req, res) => {
    try {
        const { itemID, price,customerID } = req.body;
        const customer = await customerModel.findById(customerID);
        const vehicle = await deliveryvehicleModel.findOne({"city" : customer.city,activeOrdersCount : { $lt: 2, $gte: 0 } })
        if(vehicle){
            const newOrder = new orderModel({itemID,price,customerID,deliveryVehicleID : vehicle["_id"],isDelivered : false})
            const delivery_vehicle = await deliveryvehicleModel.findByIdAndUpdate(vehicle["_id"],{activeOrdersCount : vehicle.activeOrdersCount+1}) 
            await newOrder.save()
            res.send({"msg" : "Order placed successfully"})
        }else{
            res.send({"msg" : "Can not place order vehicles are not available"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg" : "cannot place order there is some issue"})
    }
})

orderRoute.patch("/update",adminauth,async(req,res)=>{
    try {
        const { order_id ,orderNumber } = req.body;
        const order = await orderModel.findById(order_id);
        const vehicle = await deliveryvehicleModel.findById(order.deliveryVehicleID)
        if(order){
            if (vehicle.activeOrdersCount <= 0 || vehicle.activeOrdersCount > 2) {
                return res.status(400).json({ error: 'Invalid activeOrdersCount value' });
            }
            const update_vehicle = await deliveryvehicleModel.findByIdAndUpdate(order.deliveryVehicleID,{activeOrdersCount : vehicle.activeOrdersCount-1});
            const update_order = await orderModel.findByIdAndUpdate(order_id,{isDelivered : true});
            res.send({"msg" : "Order updated successfully"})
        }else{
            res.send({"msg" : "Order Not Found"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg" : "cannot update order there is some issue"})
    }
})



module.exports = orderRoute