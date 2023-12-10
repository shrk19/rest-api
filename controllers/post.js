import Post from "../models/Post.js"
import User from "../models/User.js"
import { createError } from "../error.js"


export const addPost = async (req, res, next) => {
    try{
        const newPost = new Post({userId : req.user.id, ...req.body}) 
        const savedPost = await newPost.save()
        let updatedUser = await User.findByIdAndUpdate(
            req.user.id, 
            {
                $push : { createdPosts : savedPost}
            },
            {
                new : true
            }
        )
        res.status(200).json(updatedUser)
    }catch(err){
        next(err)
    }
}
export const editPost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post) return next(createError(404, "Post not found"))
        if(req.user.id === post.userId){
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id, {
                    $set : req.body
                }, 
                {new : true}
            )
            res.status(200).json(updatedPost)
        }else{
            next(createError(401, "You can only edit posts created by you."))
        }
    }catch(err){
        next(err)
    }
}
export const deletePost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post) return next(createError(404, "Post doesnt exist"))
        if(req.user.id === post.userId){
            console.log("You can delete")
            // first delete post from user's created list 
            let updatedUser = await User.findByIdAndUpdate(
                req.user.id, 
                {
                    $pull : { createdPosts : post._id}
                },
                {
                    new : true
                }
            )
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("Post has been deleted")
        }else{
            next(createError(401, "You can only delete your own post"))
        }
        
    }catch(err){
        next(err)
    }
}
export const getPost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post) return next(createError(404, "Post doesnt exist"))
        res.status(200).json(post)
    }catch(err){
        next(err)
    }
}

export const getAllPosts = async (req, res, next) => {
    try{
        const posts = await Post.find().populate("userId");;
        if(!posts) return next(createError(404, "No posts here! Maybe you should create the first post."))
        //const populatedPosts = posts.populate("userId");
        console.log(posts)
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
}

export const bookmarkPost = async (req, res, next) => {
    try{
        const postId = req.params.id
        const userId = req.user.id
        
        const found = await User.find({_id : userId,  
            bookmarkedPosts: {
                $in: [postId] //  post ID you want to check
            }
        })

        if(found.length === 0){
            let user = await User.findByIdAndUpdate(
                userId,
                {
                    $push : { bookmarkedPosts : postId}
                }, 
                {
                    new : true
                }
            )
            res.status(200).json("Post bookmarked")
        }else{
            let user = await User.findByIdAndUpdate(
                userId,
                {
                    $pull : { bookmarkedPosts : postId}
                }, 
                {
                    new : true
                }
            )
            res.status(200).json("Post removed from bookmarks")
        }
        
    }catch(err){
        next(err)
    }
}

export const likePost = async (req, res, next) => {
    try{
        const postId = req.params.id
        const userId = req.user.id
        
        const found = await User.find({_id : userId,  
            likedPosts: {
                $in: [postId] //  post ID you want to check
            }
        })

        if(found.length === 0){
            let user = await User.findByIdAndUpdate(
                userId,
                {
                    $push : { likedPosts : postId}
                }, 
                {
                    new : true
                }
            )
            let post = await Post.findByIdAndUpdate(
                postId, 
                {
                    $inc : {likes : 1}
                }, 
                {
                    new : true
                }
            )
            res.status(200).json("Liked")
        }else{
            let user = await User.findByIdAndUpdate(
                userId,
                {
                    $pull : { likedPosts : postId}
                }, 
                {
                    new : true
                }
            )
            let post = await Post.findByIdAndUpdate(
                postId, 
                {
                    $inc : {likes : -1}
                }, 
                {
                    new : true
                }
            )
            res.status(200).json("Unlike")
        }
        
    }catch(err){
        next(err)
    }
}