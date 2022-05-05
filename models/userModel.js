const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide user name'],
        minLength: 3
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please provide a password'],
        validate: function() {
            return validator.isEmail(this.email)
        }
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minLength: 5,
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 5,
        validate: function() {
            // validating if password and confirm password are equal
            return this.confirmPassword === this.password
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurant-owner', 'delivery-boy'],
        default: 'user'
    },
    profileImg: {
        type: String,
        default: 'img/users/default.jpg'
    },

    resetToken: String
});

userSchema.pre('save', function() {
    // confirmPassword will not get saved in the db
    this.confirmPassword = undefined;
});

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

userSchema.methods.createResetToken = function() {
    // creating unique token using built-in crypto module.
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(pass, confirmPass) {
    this.password = pass;
    this.confirmPassword = confirmPass;
    this.resetToken = undefined;
}

module.exports = mongoose.model('User', userSchema);