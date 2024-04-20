
import {dbConnect} from '@lib/mongodb/db'
import {NextResponse} from 'next/server'
import User from '@models/user'


export async function GET() {
    const con = await dbConnect();

    const firstUser = await User.find();
    console.log(firstUser)
    return new NextResponse(firstUser);
    //return NextResponse.json({message: 'Hello World'})
}