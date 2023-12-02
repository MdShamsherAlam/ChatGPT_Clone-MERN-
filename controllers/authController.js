import User from "../models/userModel.js"
import errorResponse from "../utils/errorResponse.js"


//User registerController
const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return next(new errorResponse("Email is already used", 500))         //we created errorRespons in utils folder where we have to this first message second response
        }
        const user = await User.create({ username, email, password })
        const token = user.createJWT()
        res.status(200).json({
            userId: user._id,
            userEmail: user.email,
            token
        })
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}
//for login
const loginController = async (req, res, next) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return next(new errorResponse("Please provide email and password",))
        }
        const user = await User.findOne({ email })
        if (!user) {
            return next(new errorResponse("Invalid Credentials", 401))
        }
        const isMatched = await user.matchPassword(password)
        if (!isMatched) {
            return next(new errorResponse("Invalid Credentials", 401))
        }
        const token = user.createJWT()
        res.status(200).json({
            userId: user._id,
            userEmail: user.email,
            token
        })
    }
    catch (error) {
        console.log(error)
        next(error)
    }

}
const logoutController = async (req, res, next) => {
    res.clearCookie('token')
    return res.status(200).json({
        success: true,
        message: "Logout Successfully"

    })
    next()


}

export default { registerController, loginController, logoutController }