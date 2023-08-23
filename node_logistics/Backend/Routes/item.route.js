const express = require("express");
const {itemModel} = require("../Models/item.model");
const { adminauth } = require("../Middleware/adminAuth");

const itemRoute = express.Router();

itemRoute.get("/",async(req,res)=>{
  try {
    const data = await itemModel.find()
    res.send({"data" : data})
  } catch (error) {
    console.log(error)
    res.send({"msg" : "There is some error while fetching item data"})
  }
})

itemRoute.post("/post",adminauth,async (req,res)=>{
   try {
    const {name,price} = req.body;
    const item = await itemModel.findOne({name})
    if(item){
        res.send({"msg" : "Item is already present"})
    }else{
        const newItem = new itemModel({name,"price" : +price});
        await newItem.save()
        res.send({"msg" : "New item has been added"})
    }
   } catch (error) {
    console.log(error)
    res.send({"msg" : "Some problem while adding new item"})
   }
})

itemRoute.patch("/update",adminauth,async (req,res)=>{
    try {
        const {id,price} = req.body;
        console.log(req.body)
        let item = await itemModel.findById(id);
        if(item){
            await itemModel.findByIdAndUpdate(id,{"price" : +price })
            res.send({"msg" : "Item updated successfully"})
        }else{
            res.send({"msg" : "Item is not present,Please add item before updating"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg" : "There was some problem while updating item"})
    }
})

module.exports = {itemRoute}