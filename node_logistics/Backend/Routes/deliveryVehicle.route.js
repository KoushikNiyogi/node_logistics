const express = require("express");
const { adminauth } = require("../Middleware/adminAuth");
const deliveryVehicleRoute = express.Router();
const {deliveryvehicleModel} = require("../Models/deliveryVehicles.model")

deliveryVehicleRoute.post("/add",adminauth,async(req,res)=>{
    try {
        const {city,vehicleType} = req.body;        
            const newItem = new deliveryvehicleModel({city,vehicleType,activeOrdersCount : 0});
            await newItem.save()
            res.send({"msg" : "New vehicle has been added"})
        
       } catch (error) {
        console.log(error)
        res.send({"msg" : "Some problem while adding new vehicle"})
       }
})

deliveryVehicleRoute.get("/",adminauth,async (req,res)=>{
    try {       
            const vehicles = await deliveryvehicleModel.find();
            res.send({"data" : vehicles})
        
       } catch (error) {
        console.log(error)
        res.send({"msg" : "Some problem while fetching vehicle"})
       }
})

deliveryVehicleRoute.patch("/update",adminauth,async(req,res)=>{
    try {
        const {id,activeOrdersCount} = req.body;  
            const vehicle =  deliveryvehicleModel.findById(id);
            if(vehicle){
                if (activeOrdersCount < 0 || activeOrdersCount > 2) {
                    return res.status(400).json({ error: 'Invalid activeOrdersCount value' });
                }
                const newItem = await deliveryvehicleModel.findByIdAndUpdate(id,{activeOrdersCount});
                res.send({"msg" : "vehicle has been updated"})
            }     
            
        
       } catch (error) {
        console.log(error)
        res.send({"msg" : "Some problem while updating vehicle"})
       }
})

module.exports = deliveryVehicleRoute