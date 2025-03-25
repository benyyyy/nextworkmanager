import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";



// get request function
export async function GET(request) {
  let users = [];
  try {
    await connectDb();
    users = await User.find().select("-password");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to get users",
      success: false,
    });
  }

  return NextResponse.json(users);
}

// POST function to create a user
export async function POST(request) {
  // fetch user detail from  request

  const { name, email, password, about, profileURL } = await request.json();

  console.log({ name, email, password, about, profileURL });

  // create user object with user model

  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });

  try {
    // save the object to  database
    user.password = bcrypt.hashSync(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );

    console.log(user);
    await connectDb();
    const createdUser = await user.save();
    const response = NextResponse.json(user, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "failed to create user !!",
        status: false,
      },
      {
        status: 500,
      }
    );
  }}