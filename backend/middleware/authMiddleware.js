const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../modals/userModal')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get user token
        token = req.headers.authorization.split(' ')[1]
        // verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        // Get User from token
        req.user = await User.findById(decoded.id).select('-password')
        
        // use next to continue middleware
        next()
        } catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports = {protect}