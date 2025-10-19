import mongoose from "mongoose";
import dotenv from 'dotenv';

export const connectDB = async () => {
 const URI = process.env.MONGODB_URI;
 await mongoose.connect(URI).then(()=>{
  console.log("Database Connected .....");
  
})
} 