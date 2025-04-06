import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URL environment variable inside .env.local"
    );
}

// Caching the connection for development mode
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
    if (cached.conn) {
        console.log("Using cached MongoDB connection.");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("Creating new MongoDB connection...");
        const opts = {
            bufferCommands: true, // Set to false if buffering isn't needed
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            console.log("MongoDB connected successfully.");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        console.error("MongoDB connection error:", e);
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

export default dbConnect;
