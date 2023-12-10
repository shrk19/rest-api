import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    createdPosts: [ {type: mongoose.Schema.Types.ObjectId, ref: "Post"} ], 
    likedPosts: [ {type: mongoose.Schema.Types.ObjectId, ref: "Post"} ],
    bookmarkedPosts: [ {type: mongoose.Schema.Types.ObjectId, ref: "Post"} ]
}, {timestamps: true})

export default mongoose.model("User", UserSchema);