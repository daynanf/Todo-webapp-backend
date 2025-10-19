import mongoose from "mongoose";

export const connectDB = async () => {
 const MONGODB_URI ='mongodb+srv://dinu:db123@cluster0.dmaqehx.mongodb.net/Todo app';

 await mongoose.connect(MONGODB_URI).then(()=>{
  console.log("Database Connected .....");
  
})
} 