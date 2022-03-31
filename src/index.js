const express=require("express");
const usersController=require("./controllers/user.controller")

const app=express()

app.use(express.json());

app.use("/user1",usersController);
module.exports=app