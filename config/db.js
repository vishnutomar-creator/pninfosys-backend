import mongoose from "mongoose";

let isConnected = false; // track connection state across invocations

const connectDB = async () => {
    if (isConnected) {
        // Reuse existing connection (warm function instance)
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error.message);
        throw error; // let the caller/route handle it, don't kill the process
    }
};

export default connectDB;