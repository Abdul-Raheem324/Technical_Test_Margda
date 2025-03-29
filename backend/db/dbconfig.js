import mongoose from "mongoose";
const connectMongoDb = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDb connected!.")
    } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
    }
}

export default connectMongoDb