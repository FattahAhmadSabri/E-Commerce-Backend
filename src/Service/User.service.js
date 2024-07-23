const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../Models/UserModels');
const jwt = require('jsonwebtoken')
const jwtProvider = require('../Config/jwtProvider')


const createUser = async (userData) => {
    let { firstName, lastName, email, password ,mobile} = userData;
        console.log(userData)
    try {
        // Check if the email already exists
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            throw new Error(`${email} This email is already exist`);
        }

        // Hash the password
        password = await bcrypt.hash(password, 10);
      
        // Create a new user
        const user = await User.create({ firstName, lastName, email, password, mobile });
        console.log(user); 
        return user;
    } catch (error) {
        throw new Error(error.message || error); 
    }
};

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId)
        // .populate("address");
        if (!user) {
            throw new Error(`User not found for ID: ${userId}`); 
        }
        return user;
    } catch (error) {
        throw new Error(error.message || error);  
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User not found for ID: ${email}`); 
        }
        return user;
    } catch (error) {
        throw new Error(error.message || error);
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFormToken(token)
        const user = await findUserById(userId)
        if (!user) {
            throw new Error(`User not found for ID: ${userId}`)
        }
        return user;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

const getAllUser = async () => {
    try {
        const user = await User.find()
        return user;
    } catch (error) {
        throw new Error(error.message || error);
    }
}
module.exports = { createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUser };
