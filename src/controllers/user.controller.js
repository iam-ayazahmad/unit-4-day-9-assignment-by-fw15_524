const express=require("express")
const{body,validationResult}=require("express-validator");
const { route } = require("../../../we/src/controllers/user.controllers");

const User=require("../models/user.model");

const router=express.Router();

router.post("",
body("first_name").not().isEmpty().withMessage("first name cannot be empty"),

body("last_name").not().isEmpty().withMessage("last name cannot be empty"),

body("email").not().isEmpty().withMessage("email cannot be empty").isEmail().withMessage("it should be valid email"),

body("pincode").not().isEmpty().withMessage("pincode cannot be empty").isNumeric().custom((value)=>{

    if(value.length!==6){
        throw new Error("length must be exactly 6 character")
    }
    return true
}),

body("age").not().isEmpty().withMessage("age cannot be empty").isNumeric()
.custom((value)=>{

    if(value<=1 || value>=100){
        throw new Error("age must be between 1 to 100")
    }
    return true
}),

body("gender").custom((value)=>{
    if(value!=="male" && value!=="female" && value!=="others"){
        throw new Error("it should be male,female or others")
    }
    return true

}),

async(req,res)=>{

    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array() })
        }
        const user=await User.create(req.body)
        return res.status(201).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }

});

module.exports=router