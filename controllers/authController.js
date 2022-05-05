const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../router/utility/nodemailer');

const register = async(req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    const userExists = await User.findOne({ email });

    try {
        if(userExists) {
            res.status(400).json({
                msg: 'User already exists'
            });
        } else {
    
            const user = await User.create({
                name,
                email,
                password,
                confirmPassword: passwordConfirm
            });

            sendMail("signup", user);

            if(user) {
                res.json({    
                    msg: 'User registered successfully',
                    userName: user.name,
                    userEmail: user.email
                })
            } else{
                res.status(400).json({
                    msg: 'Invalid credentials'
                })
            }
        }
    } catch(err) {
        console.log(err.message);
    }   
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(email && password) {
            let user = await User.findOne({ email });
            let comparePasswords = await bcrypt.compare(password, user.password);
    
            if(user) {
                if(comparePasswords) {
                    let uid = user._id;
                    const token = jwt.sign({ uid }, process.env.JWT_SECRET);
                    res.cookie('login', token, { httpOnly: true }); // user logged in cookie set to true
                    res.status(200).json({
                        msg: 'User logged in successfully',
                        id: user._id,
                        userName: user.name,
                        userEmail: user.email,
                    })
                } else { 
                    res.status(400).json({
                        msg: 'Passwords do not match'
                    });
                }
            } else {
                res.status(400).json({
                    msg: 'Email not found'
                })
            }
        } else {
            res.status(400).json({
                msg: 'No email found'
            })
        }

    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

// forget password
const forgetPassword = async(req, res) => {
    let { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user) {
            // create a reset-token
            const resetToken = user.createResetToken();
            // link to send the email:  http://website-name/reset-password/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
            // send email to the resetPasswordLink through nodemailer
            let obj = {
                resetPasswordLink: resetPasswordLink,
                email: email
            }

            sendMail("resetpassword", obj);

            res.status(200).json({
                msg: "Password reset link sent!"
            })
        } else {
            res.status(400).json({
                msg: 'Please signup'
            });
        }
    } catch(err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

// reset password
const resetPassword = async(req, res) => {
    let { password, confirmPassword } = req.body;
    let { token } = req.params;

    try {
        const user = await User.findOne({ resetToken: token });
        // update password in db
        user.resetPasswordHandler(password, confirmPassword);
        if(user) {
            await user.save();
            res.status(201).json({
                msg: 'password updated successfully, please login again'
            })
        } else {
            res.status(400).json({
                msg: 'User not found'
            })
        }
    } catch(err) {
        res.json(201).json({
            msg: 'could not update password'
        })
    }
}

// logout user
const logout = async(req, res) => {
    try {
        res.cookie('login', ' ', { maxAge: 1 });
        res.status(200).json({
            msg: 'User logged out successfully'
        });
    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword,
    logout
}