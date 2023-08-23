const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

// Fetch a list of users
exports.fetch_users = async (req, res) => {
    try {
        const users = await Users.find({}, {password: false, __v: false});
        res.status(200).json({success: true, data: users, message: "Successfully fetch users"});
    } catch (err) {
        return res.status(500).json({success: false, data: {}, message: err.message});
    }
}

// Fetch one user
exports.fetch_user = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id, {password: false, __v: false});
        res.status(200).json({success: true, data: user, message: "Successfully fetch users"});
    } catch (err) {
        return res.status(500).json({success: false, data: {}, message: err.message});
    }
}

// Create user
exports.create_user = async (req, res) => {
    try {
        const { nama, email, jenis_kelamin, password, confirm_password } = req.body;
        if (password != confirm_password) {
            return res.status(406).json({success: false, data: {}, message: "Confirmation password is not the same"});
        }

        const check_user = await Users.findOne({email});
        if (check_user !== null) {
            return res.status(409).json({success: false, data: {}, message: "User already registered"});
        }

        let hashed_password = await bcrypt.hash(password, 10);

        const user = await Users.create({ nama, email, jenis_kelamin, password: hashed_password });

        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h",
            }
        );

        res.status(201).json({success: true, data: {nama, email, jenis_kelamin, token}, message: "Successfully register user"});
    } catch (err) {
        return res.status(500).json({success: false, data: {}, message: err.message});
    }
}

// Update user
exports.update_user = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndUpdate(id, req.body);
        return res.status(200).json({success: true, data: {}, message: "Successfully update user"});
    } catch (err) {
        return res.status(500).json({success: false, data: {}, message: err.message});
    }
}

// Delete user
exports.delete_user = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndRemove(id, req.body);
        return res.status(200).json({success: true, data: {}, message: "Successfully delete user"});
    } catch (err) {
        return res.status(500).json({success: false, data: {}, message: err.message});
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!(email && password)) {
            res.status(400).json({success: false, data: {}, message: "All input are required"});
        }
        
        const user = await Users.findOne({ email }, {nama: false, jenis_kelamin: false, __v: false});
            
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await jwt.sign(
                {user_id: user._id, email},
                process.env.SECRET_KEY,
                {
                    expiresIn: "2h",
                }
            );
    
            return res.status(200).json({success: true, data: {user_id: user._id, email, token}, message: "Successfully login!"});
        }
        res.status(401).json({success: false, data: {}, message: "Invalid Credentials"});
    } catch (err) {
        return res.status(500).json({success: false, data: {}, message: err.message});
    }
}

function compareAsync(password, hashed_password) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hashed_password, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}