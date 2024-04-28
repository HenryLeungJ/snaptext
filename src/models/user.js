
import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true,
    //     required: true,
    //     auto: true,
    //   },
    userid: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    icon: {type: Number, required: true}
});

export default mongoose.models.User || model('User', userSchema);