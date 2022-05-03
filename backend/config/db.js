import mongoose from "mongoose";

const connectDB = async () => {

    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.white);
        
    } catch (err) {

        console.log(`MongoDB connection error: ${conn.connection.host}`.bgRed.white);
        process.exit(1);
    }
}

export default connectDB;