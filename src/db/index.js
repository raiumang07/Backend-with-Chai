import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";
// APPROACH 2 Professional Approach
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MONGODB connected successfully");
    } catch (error) {
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}\n`);
        process.exit(1);
    }
}

export default connectDB