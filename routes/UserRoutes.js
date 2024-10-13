const UserModel = require('../models/UserModel.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


const JWT_SECRET = 'your_jwt_secret_key'; 

// Route to handle user signup
router.post('/user/signup', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).send({
            message: "Username, email, and password cannot be empty"
        });
    }

    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send({
            message: err.message || "An error occurred while creating the user."
        }));
});
// Route to handle user login
router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: "Email and password cannot be empty"
        });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(401).send({
                message: "Invalid password"
            });
        }

        res.status(200).send({
            message: "Login successful",
            userId: user._id
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred during login"
        });
    }
});
module.exports = router;
