import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';



const login = asyncHandler(async (req, res) => {


    const { email, password } = req.body;

    if (!email || !password) {
        res.status(404)
        throw new Error('Please add all fields')
    }


    const user = await User.findOne({ email: email })
    if (!user) {
        res.status(404)
        throw new Error('Invalid email')
    }

    const isCheck = await bcrypt.compare(password, user.password)
    if (!isCheck) {
        res.status(404)
        throw new Error('Invalid password')
    }

    res.status(200).json({
        msg: "Login successfull!",
        success: true,
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
    })

}) 



const register = asyncHandler(async (req, res) => {

    const { name, email, password, password2 } = req.body;


    if (!name || !email || !password || !password2) {
        res.status(404)
        throw new Error('Please add all fields')
    }

    const user = await User.findOne({ email: email })
    if (user) {
        res.status(404)
        throw new Error('Email already exist')
    }

    if (password !== password2) {
        res.status(404)
        throw new Error("Password doesn't match")
    }


    const salt = await bcrypt.genSalt(10)
    if (!salt) {
        res.status(404)
        throw new Error('Something went wrong with bcrypt')
    }

    const hashPassword = await bcrypt.hash(password, salt)
    if (!hashPassword) {
        res.status(404)
        throw new Error('Something went wrong with hashing password')
    }

    const newUser = new User({
        name,
        email,
        password: hashPassword
    })

    const savedUser = await newUser.save();

    if (savedUser) {
        
        res.status(200).json({
            msg: "Register successfull!",
            success: true,
            token: generateToken(savedUser._id),
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin
            }
        })
    }
})


const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
})



/**
 * @description  Update user profile
 * @route        PUT /api/users/profile
 * @access       Public
 */
 const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        res.status(400)
        throw new Error("something went wrong with bcrypt"); 
    }

    const hashPassword = await bcrypt.hash(req.body.password, salt);
    if (!hashPassword) {
        res.status(400)
        throw new Error("something went wrong with hashing password");
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
        user.password = hashPassword || user.password
    }

    const updatedUser = await user.save();

    res.status(201).json({ 
        msg: "Updated successfull!",
        success:  true,
        token: generateToken(updatedUser._id),
        user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        }
    })

});








export {
    login,
    register,
    getUserProfile,
    updateUserProfile
}