import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    desc: {
        type: String, 
        required: true
    },  
    username: {
        type: String, 
        required: true
    },
    userId: {
        type: String,
        required: true
    }, 
    postId: {
        type: String, 
        required: true
    }, 
}, {timestamps: true})

export default mongoose.model("Comment", CommentSchema);