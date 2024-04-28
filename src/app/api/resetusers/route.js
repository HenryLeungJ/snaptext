
import {dbConnect} from '@/lib/mongodb/db'
import {NextResponse} from 'next/server'
import User from '@/models/user'


export async function DELETE() { //req data from body

    try {
        // const deletedUser = User.findOne({userid: deleteUser.id})
        await User.deleteMany({});
        return NextResponse.json("deleted all");
    } catch (error) {
        console.log(error);
        return NextResponse.json("failed deleteding all");
    }
    // console.log(allUsers[0].id, deleteUser.id)
    //return NextResponse.json({message: 'Hello World'})
}