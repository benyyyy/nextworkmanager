import mongoose from "mongoose";
import { User } from "../models/user";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "work_manager",
    });

    console.log("Database connected...");

    // Check if the user already exists
    const existingUser = await User.findOne({ email: "test@gmail.com" });
    if (!existingUser) {
      // Create a new user for testing
      const newUser = new User({
        name: "Test User",
        email: "test@gmail.com",
        password: bcrypt.hashSync("testpassword", 8), // Hash the password
        about: "This is a test user",
      });

      await newUser.save();
      console.log("Test user created.");
    } else {
      console.log("Test user already exists.");
    }

  } catch (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  }
};
