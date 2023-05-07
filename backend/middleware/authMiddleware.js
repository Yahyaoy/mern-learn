const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const protect = asyncHandler(async (req,res,next)=>{
    let token = req

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)


            //Get user from the token استثناء كلمة المرور 
            req.user = await User.findById(decoded.id).select('-password')
            // Finally, the next() middleware function is called to pass control to the next function in the middleware stack. This is a crucial step in allowing the middleware chain to proceed and ensure that all necessary middleware functions are executed.
            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}