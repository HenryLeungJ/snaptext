
import {dbConnect} from '@lib/mongodb/db'
import {NextResponse} from 'next/server'
import User from '@/models/user'


export async function POST(req) {
    const userRequest = await req.json();
    const con = await dbConnect();
    const newUser = new User({
        id: userRequest.id,
    })
    try {
        await newUser.save();
    } catch (error) {
        console.log("New user load failed failed")
    }
    

    const allUsers = await User.find();
    console.log(allUsers)
    return NextResponse.json(allUsers);
    //return NextResponse.json({message: 'Hello World'})
}