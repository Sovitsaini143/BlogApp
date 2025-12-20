import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conncect Mongodb Successfully..')

    } catch (error){
        console.log("Error in connect MongoDB", error)
    }
}