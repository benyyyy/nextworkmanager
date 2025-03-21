import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

connectDb();

export async function POST(request) {
  console.log("login api");
  const { email, password } = await request.json();
  
  try {
    // 1. Get user
    const user = await User.findOne({
      email: email,
    });

    if (user == null) {
      throw new Error("user not found !!");
    }
    // 2. Password check
    const matched = bcrypt.compareSync(password, user.password); // Return true or false
    if (!matched) {
      throw new Error("Password not matched !!");
    }
    // 3. Generate token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY
    );

    // 4. Create NextResponse--cookie
    const response = NextResponse.json({
      message: "Login success !!",
      success: true,
      user: user,
    });
//5.set token in cookies 
    response.cookies.set("authToken", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
    });

    console.log(user);
    console.log(token);

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
