import mongoose from 'mongoose'
import color from 'colors'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log(`CONNECTED TO MONGODB DATABASE ${mongoose.connection.host}`.bgGreen.white)
    }
    catch (error) {
        console.log(`MongoDB database Error ${error}`.bgRed.white)
    }

}

export default connectDB;