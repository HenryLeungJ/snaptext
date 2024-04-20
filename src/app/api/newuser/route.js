
import {dbConnect} from '@/lib/mongodb/db'
import {NextResponse} from 'next/server'
import User from '@/models/user'


export async function POST(req) { //req data from body
    const userRequest = await req.json();
    console.log(userRequest.name)
    const con = await dbConnect();
    const newUser = new User({
        userid: userRequest.id,
        username: userRequest.name,
    })
    console.log(newUser);
    try {
        await newUser.save();
    } catch (error) {
        console.log("New user load failed", error)
    }
    

    const allUsers = await User.find();
    return NextResponse.json(allUsers);
    //return NextResponse.json({message: 'Hello World'})
}