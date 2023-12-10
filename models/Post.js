import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    title: {
        type: String, 
    }, 
    body: {
        type: String, 
    }, 
    tags: {
        type: [String], 
        default: []
    }, 
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model("Post", PostSchema)