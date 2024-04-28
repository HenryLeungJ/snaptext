
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
    // console.log(newUser);
    try {
        await newUser.save();
        console.log("added: " + userRequest.name + " with id " + userRequest.id)
        return NextResponse.json({id: userRequest.id, username: userRequest.name});
    } catch (error) {
        console.log("New user load failed", error)
        return NextResponse.json(error);
    }
    

    // const allUsers = await User.find();
    //return NextResponse.json({message: 'Hello World'})
}