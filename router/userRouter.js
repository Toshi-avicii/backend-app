const express = require('express');
const { updateUser, deleteUser, getCurrentUser, getAllUsers, updateProfileImage } = require('../controllers/userController');
const { register, login, forgetPassword, resetPassword, logout } = require('../controllers/authController');
const userRouter = express.Router();
const isAuthorized = require('../middlewares/isAuthorized');
const protectRoute2 = require('../middlewares/protectRoute2');
const multer = require('multer');

userRouter.use(express.static('../public'));

userRouter.route('/:id').patch(protectRoute2, updateUser).delete(protectRoute2, deleteUser);
userRouter.route('/signup').post(register);
userRouter.route('/login').post(login);

// multer
const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images")
    },
    filename: function(req, file, cb) {
        cb(null, `user-${Date.now()}.jpg`);
    }
});

const filter = function(req, file, cb) {
    if(file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload an image"));
    }
}

const upload  = multer({
    storage: multerStorage,
    fileFilter: filter
})

userRouter.route('/profile-image').post(upload.single('photo'), updateProfileImage).get(function(req, res) {
    res.sendFile('C:/Users/home/Desktop/backend-dev/public/multer.html');
})

userRouter.route('/userProfile').get(protectRoute2, getCurrentUser);
userRouter.route('/forget-password').post(forgetPassword);
userRouter.route('/reset-password/:token').post(resetPassword);
userRouter.route('/logout').get(logout);
// admin specific function
userRouter.route('/').get(protectRoute2, isAuthorized(['admin']), getAllUsers);
module.exports = userRouter; 