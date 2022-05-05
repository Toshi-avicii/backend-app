const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// const protectRoute2 = async(req, res, next) => {
//     try {
//         let token;
//         if(req.headers && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(" ")[1]; // here goes the jsonwebtoken
//             if(token) {
//                 const payload = jwt.verify(token, process.env.JWT_SECRET);
//                 if(payload) {
//                     const { uid } = payload;
//                     const user = await User.findById(uid);
//                     req.role = user.role;
//                     req.id = user._id;
//                     next();
//                 } else {
//                     res.status(400).json({
//                         msg: 'User not verified'
//                     })
//                 }
//             } else {
//                 res.status(400).json({
//                     msg: 'Not authorized'
//                 });
//             }
//         }
//     } catch(err) {
//         res.status(400).json({
//             msg: err.message
//         })
//     }
// }

const protectRoute2 = async(req, res, next) => {
    try {
        let token;
        if(req.cookies.login) {
            let payload = jwt.verify(req.cookies.login, process.env.JWT_SECRET);
            token = req.cookies.login;
            if(payload) {
                    const { uid } = payload;
                    const user = await User.findById(uid);
                    req.role = user.role;
                    req.id = user._id;
                    next();
                } else {
                    res.status(400).json({
                        msg: 'User not verified'
                    })
                }
        } else {
            // browser
            const client = req.get('User-Agent');
            if(client.includes('Mozilla') === true) {
                res.redirect('/login');
            } else {
                // postman
                res.status(400).json({
                    msg: 'Operation not allowed'
                })
            }
        }
    } catch(err) {
        res.status(400).json({
            msg: err.message
        })
    }
}

module.exports = protectRoute2;