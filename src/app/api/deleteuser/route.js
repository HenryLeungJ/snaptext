
import {dbConnect} from '@lib/mongodb/db'
import {NextResponse} from 'next/server'
import User from '@/models/user'


export async function DELETE(req) {
    const deleteUser = await req.json();
    const con = await dbConnect();

    try {
        await User.deleteOne({id: deleteUser.id});
    } catch (error) {
        console.log(error);
    }
    // console.log(allUsers[0].id, deleteUser.id)
    return new NextResponse('done');
    //return NextResponse.json({message: 'Hello World'})
}