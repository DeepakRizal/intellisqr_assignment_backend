import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Database connected`);
  } catch (error) {
    console.log("Error connecting to DB:", error);
    process.exit(1);
  }
};
