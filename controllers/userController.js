const bcrypt = require('bcrypt')
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async(req,res)=>{
    console.log("inside the registerController");

    console.log(req.body);
    const{username,email,password} = req.body

    // check email is in db
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(409).json("User Already Exist.... Please Login!!!")
    }else{
        // insert new document in db
        let encryptPassword = await bcrypt.hash(password,10)
        const newUser = await users.create({
            username,email,password:encryptPassword
        })
        res.status(201).json(newUser)
    }
    

    res.status(201).json("Register Request Recieved !!!")

}
// login
exports.loginController = async(req,res)=>{
    console.log("inside the loginController");
    const{email,password} = req.body

    // check email is in db
    const existingUser = await users.findOne({email})
    if(existingUser){
        // check password
        const isPasswordMatch = await bcrypt.compare(password,existingUser.password)
        if(isPasswordMatch){
            const token = jwt.sign({userMail:email,role:existingUser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(409).json("Invalid Password..!!")
        }
    }else{
      res.status(409).json("Invalid Email.. Please Register!!")
    }
}

// edit user
// edit admin