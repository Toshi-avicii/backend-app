const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
    if(req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login, process.env.JWT_SECRET);
        if(isVerified) {
            next();
        }
    } else {
        return res.json({
            msg: 'Operation not allowed'
        })
    }
}

// const protectRoute = (req, res, next) => {
//     let token;
//     if(req.headers && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(" ")[1]; // here goes the jsonwebtoken
//             if(token) {
//                 jwt.verify(token, process.env.JWT_SECRET);
//                 next();
//             } else {
//                 res.status(400).json({
//                     msg: 'Not authorized'
//                 });
//             }
//         } catch(err) {
//             res.status(400).json({
//                 msg: 'Not authorized'
//             })
//         }
//     }
// }

module.exports = protectRoute;