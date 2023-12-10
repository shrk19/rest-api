import express from 'express'
import { addPost, editPost, deletePost, getPost, bookmarkPost, likePost, getAllPosts } from '../controllers/post.js'
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

// create a post 
router.post("/create", verifyToken, addPost)
// edit/update post 
router.put("/:id", verifyToken, editPost)
// delete post 
router.delete("/:id", verifyToken, deletePost)
// get a post
router.get("/:id", getPost)
// get all posts 
router.get("/", getAllPosts)

// bookmarks 
router.put("/bookmark/:id", verifyToken, bookmarkPost)

// like post 
router.put("/like/:id", verifyToken, likePost)


export default router;