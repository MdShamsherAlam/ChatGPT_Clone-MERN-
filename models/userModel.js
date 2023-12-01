import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'password size must be 6 characters  or larger  ']
    },
    customerId: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""
    }
})
userSchema.pre('save', async function (next) {
    //update
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})
//match password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//jwt token
userSchema.methods.getSignedToken = function () {
    // this is for managing token
    const accessToken = JWT.sign({ id: this._id }, process.env.JWT_ACESS_SECRET, { expiresIn: process.env.JWT_ACESS_EXPIREIN });
    // this is for managing session
    const refreshToken = JWT.sign({ id: this._id }, process.env.JWT_REFRESS_TOKEN, { expiresIn: process.env.JWT_REFRESS_EXPIREIN });

    return { accessToken, refreshToken };
};

userSchema.methods.setRefreshTokenCookie = function (res) {
    const { refreshToken } = this.getSignedToken(); // Use the correct method here
    res.cookie("refreshToken", `${refreshToken}`, {
        maxAge: 86400 * 7000,
        httpOnly: true,
    });
};

const User = mongoose.model('user', userSchema)

export default User;