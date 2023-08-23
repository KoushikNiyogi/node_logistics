const express = require("express");
const cors = require("cors");
const { itemRoute } = require("./Routes/item.route");
const customerRoute = require("./Routes/customer.route");
const deliveryVehicleRoute = require("./Routes/deliveryVehicle.route");
const {connect_DB} = require("./db");
const orderRoute = require("./Routes/order.route");

const app = express();
app.use(cors({
    origin : "*"
}))
app.use(express.json());
app.use("/item",itemRoute)
app.use("/customer",customerRoute)
app.use("/vehicles",deliveryVehicleRoute)
app.use("/order",orderRoute)

app.listen(4040,async ()=>{
   try {
     await connect_DB
     console.log("server is running at port 4040")
   } catch (error) {
     console.log("Something is wrong.server is not running in port 4040")
   }
})