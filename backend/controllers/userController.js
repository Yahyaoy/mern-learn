const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
// @desc     Register new User
// @route  POST /api/users/:id
//@access Public
const registerUser = asyncHandler(async(req, res)=>{
    const {name,email,password} = req.body
    if(!name ||!email ||!password){
        res.status(400)
        throw new Error('Please add all fields!')
    }

    // check if user exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message:'Register User'})
})

// @desc   Autenticate a User
// @route  POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentails')
    }
    // res.json({message:'Login User'})
})

// @desc   Get user data
// @route  Get /api/users/me
//@access Public
const getMe =asyncHandler(async(req, res) =>{
    res.json({message:'User data display'})
})


module.exports ={
    registerUser,
    loginUser,
    getMe
}