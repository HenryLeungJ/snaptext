
import {dbConnect} from '@/lib/mongodb/db'
import {NextResponse} from 'next/server'
import User from '@/models/user'


export async function DELETE(req) { //req data from body
    const deleteUser = await req.json();
    const con = await dbConnect();

    try {
        // const deletedUser = User.findOne({userid: deleteUser.id})
        await User.deleteOne({userid: deleteUser.id});
        return NextResponse.json({userid: deleteUser.id});
    } catch (error) {
        // console.log(error);
        // return NextResponse.json({error: error})
    }
    // console.log(allUsers[0].id, deleteUser.id)
    //return NextResponse.json({message: 'Hello World'})
}