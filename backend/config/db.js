import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL is not defined. Check backend/.env and dotenv setup.");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    } catch (error) {
        console.log("db error",error)
    }
}
export default connectDb