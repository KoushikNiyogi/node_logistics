const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { customerModel } = require("../Models/customer.model")

const customerRoute = express.Router()

customerRoute.post("/register", async(req,res)=>{
    const { name, email, city , password } = req.body
    console.log(req.body)
    try {
        let ExistingUser = await customerModel.findOne({ email: email })
        console.log(ExistingUser);
        if (ExistingUser) {
            res.send({ msg: "User Already Exists, Try Login" })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err){
                    res.send({ msg: "New User not Added" })
                }else{
                let newUser = new customerModel({ name, email, password: hash,city })
                await newUser.save();
                res.send({ msg: "New User Added", user: newUser })
                }
            })
        }
    } catch (e) {
        console.log(e)
        res.send(`Registration Error`)
    }
})

customerRoute.post("/login",async(req,res)=>{
    const { email, password } = req.body
    console.log(email,password)
    try {
        let User = await customerModel.findOne({ email: email })
        if (User) {
            bcrypt.compare(password, User.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: User._id },"node-logistics-customer");
                    res.send({ msg: `Login Success ! WelcomeBack ${User.name}`, token: token, user: User });
                } else {
                    res.send({ msg: "Wrong Password" })
                }
            })
        } else {
            res.send({ msg: `Email ${email} does not Exist. Try Registring` })
        }
    } catch (e) {
        console.log(e)
        res.send({ msg: "Error", reason: e.message })
    }
})

customerRoute.post("/admin_login",async(req,res)=>{
    const { email, password } = req.body
    console.log(email,password)
    try {
        if (email === "admin@gmail.com") {
                if (password == "admin1234") {
                    let token = jwt.sign({ email : email},"node-logistics-admin");
                    res.send({ msg: `Login Success ! WelcomeBack Admin`, token: token });
                } else {
                    res.send({ msg: "Wrong Password" })
                }
            }
         else {
            res.send({ msg: `Not Authorized Login` })
        }
    }catch (e) {
        console.log(e)
        res.send({ msg: "Error" })
    }
})

module.exports = customerRoute