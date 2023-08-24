# Node-logistics Backend

# BaseURL - [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)

## customer routes - /customer

1 ] **POST method - for registering new user** 

 **[https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/customer/register** 
request payload  

```jsx
{
  "name" : "Koushik",
  "city" : "city"
  "email" : "koushik@gmail.com",
  "password" : "1234", 
}
```

Responses

```jsx
//If email is already present 
{
  "msg": "User Already Exists, Try Login"
}
//If user is new
{
  "msg": "New User Added",
  "user": {
    "email": "littlemaster@gmail.com",
    "password": "$2b$05$mZuFHg67gbqK1r3oSc.17eI81eBK2ULxOWw5bO0ZmkmAutSADrO1W",
    "name": "Thor",
    "city": "Mysore",
    "_id": "64e788f501f46822e651745b",
    "__v": 0
  }
}
```

### 2] POST route - /login - [**https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/customer/login**

request payload 

```jsx
{
   "email" : "koushik@gmail.com",
   "password" : "1234"
}
```

Responses

```jsx
//User email not found
{"msg" : "Email koushik@gmail.com does not Exist. Try Registring"}

//user email is present and password is wrong 
{ msg: "Wrong Password" }

//user email present in database and passwords matching
{
  "msg": "Login Success ! WelcomeBack Tony",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU2NzYyNmIyMDU3YzJhNmY5ZDY5YWEiLCJpYXQiOjE2OTI4OTcwMjV9.lW7Y_QW-RHqileEW64uaiuQdCd06x2I5eo9gnnt_wyE",
  "user": {
    "_id": "64e67626b2057c2a6f9d69aa",
    "email": "tony@gmail.com",
    "password": "$2b$05$Wq2nCx4ll6AY7ntzeXAeCOXege2XbtJNQFX2FK1n9CzHQ1xtTuLre",
    "name": "Tony",
    "city": "Mysore",
    "__v": 0
  }
}
```

### 3] POST route - /admin_login - [https://node-logistics-backend.onrender.com/customer/admin_login](https://node-logistics-backend.onrender.com/customer/admin_login)

request payload 

```jsx
//admin creadentials are hard coded as there is no route for registering admin
{
  "email" : "admin@gmail.com",
  "password" : "admin1234"
}
```

response

```jsx
//if email === "admin@gmail.com" and password == "admin1234"
{
  "msg": "Login Success ! WelcomeBack Admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5Mjg5NzM3MH0.aQTl-bCIwtiV92wjt2K0En9iqqBOTkC80U2YtTgRYtM"
}

//if password is wrong
{
  msg: "Wrong Password"
}

//if email is not "admin@gmail.com"
{ msg: `Not Authorized Login` }
```

# Items route - /Item

- 1]GET Method - [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/item/
    
    response - {data : []}
    
- 2]POST Method - [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/item/post
    
    To add new items you need to pass admin token got by /admin_login route
    
    ```jsx
    headers : {
     "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5Mjg5NzM3MH0.aQTl-bCIwtiV92wjt2K0En9iqqBOTkC80U2YtTgRYtM"
    }
    ```
    
    Request Payload 
    
    ```jsx
    {
       "name" : "King Slayer",
       "price" : 1000000
    }
    ```
    
    Response
    
    ```jsx
    //If name of item is already present in backend
    {"msg" : "Item is already present"}
    
    //Item successfully added
    {"msg" : "New item has been added"}
    
    ```
    
- PATCH Method - /update -to Update price of Item
    
    [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/item/post
    
    Request Payload 
    
    ```jsx
    {
      "id" : "64e676afb2057c2a6f9d69af", //unique objected["_id"] created by mongoDB
      "price" : 1400
    }
    ```
    
    Response 
    
    ```jsx
    //If document is not present 
    {"msg" : "Item is not present,Please add item before updating"}
    
    //If request is successful
    {"msg" : "Item updated successfully"}
    ```
    

## Delivery Vehicles Route - /vehicles

- 1]POST Method - /add - adds new vehicle
    
     [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/vehicles/add
    
    Request Payload
    
    ```jsx
    {
      "city" : "Bangalore,
      "vehicleType" : enum("bike" | "truck")
    }
    ```
    
    Response 
    
    ```jsx
    //successful request
    {"msg" : "New vehicle has been added"}
    ```
    
- 2]GET Method - / - Reads vehicle data
    
     [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/vehicles/
    
    Response - { “data” : []}
    
- 3]PATCH Method - /update - Updates activeOrdersCount
    
     [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/vehicles/update
    
    Request Payload
    
    ```jsx
    { 
      "id" : "", // Id is unique objectId assigned to vehicle in string format 
      "activeOrdersCount" : 0 | 1 | 2
    }
    ```
    
    Response
    
    ```jsx
    //If activeOrderCount <0 || activeOrderCount > 2
    { error: 'Invalid activeOrdersCount value' }
    
    //Successful Request 
    {"msg" : "vehicle has been updated"}
    ```
    

   

## Order Route - /order

- 1] GET Route - / - To get data of orders
    
    [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/order/
    
    Response - {data : “”}
    
- 2]POST Route - /add  - To add new orders
    
    [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/order/add
    
    Request Payload
    
    ```jsx
    { 
     itemID : "", //Unique objectId of item in format of string
     price : 1000,
     customerID : "" //Unique objectId of customer in format of string
    }
    ```
    
    Response
    
    ```jsx
    // check for vehicle availability and activeOrderCount<2
    //Successfull
    {"msg" : "Order placed successfully"}
    
    //failure
    {"msg" : "Can not place order vehicles are not available"}
    ```
    
- PATCH Route - /update - to update isDelivered by delivery agents
    
    [https://node-logistics-backend.onrender.com](https://node-logistics-backend.onrender.com/)/order/add
    
    Request Payload
    
    ```jsx
    { 
    order_id : "" , //Unique Order id 
    orderNumber : "" //Unique Order number in this format "00001","00010"
    }
    ```
    
    Response 
    
    ```jsx
    //checking if order is present, checking if vehicle activeCount value 
    //if activeOrderCount > 2 || activeOrderCount < 0
    { error: 'Invalid activeOrdersCount value' }
    //if activeOrderCount is correct decrement by 1 and set isDelivered to true - successfull
    {"msg" : "Order updated successfully"}
    
    ```
