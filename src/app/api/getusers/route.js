import { dbConnect } from "@/lib/mongodb/db";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const con = await dbConnect();

  const firstUser = await User.find();
  // console.log(firstUser)
  return NextResponse.json(firstUser);
  //return NextResponse.json({message: 'Hello World'})
}
