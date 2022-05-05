const User = require("../models/userModel");

const updateUser = async(req, res) => {
    let { id } = req.params;
    
    try {
        let user = await User.findById(id);
        if(user) {
            let updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            res.status(201).json({
                msg: 'data updated successfully',
                data: updatedUser
            });
        } else {
            res.status(400).json({
                msg: 'Could not update the user data'
            })
        }
    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

const deleteUser = async(req, res) => {
    let { id } = req.params;
    
    try {
        let user = await User.findById(id);
        if(user) {
            let deletedUser = await User.findByIdAndDelete(id);
            res.status(200).json({
                msg: 'Account deleted successfully',
                data: deletedUser
            });
        } else {
            res.status(400).json({
                msg: 'Could not delete the user'
            })
        }
    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

const getCurrentUser = async(req, res) => {
    try {
        const user = await User.findById(req.id);
        if(!user) {
            res.status(400).json({
                msg: 'User does not exist'
            });
        } else {
            res.status(200).json({
                data: user
            });
        }

    } catch(err) {
        res.status(400).json({
            msg: 'User does not exist'
        });
    }
}

const getAllUsers = async(req, res) => {
    try {
        console.log(req);
        const response = await User.find();
        res.status(201).json({
            data: response
        })

    } catch(err) {
        res.status(400).json({
            msg: 'Error fetching data'
        })
    }
}

const updateProfileImage = function(req, res) {
    res.json({
        msg: "File uploaded successfully"
    })
}

module.exports = {
    updateUser,
    deleteUser,
    getCurrentUser,
    getAllUsers,
    updateProfileImage
}