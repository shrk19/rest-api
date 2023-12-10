import express from 'express'
import { updateUser, deleteUser, findUser, getLikedPost, getMyPosts, getBookmarkedPost } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// update user - if token access token of the user is verified then he can update his acc 
router.put('/:id', verifyToken, updateUser)
// delete user 
router.delete('/:id', verifyToken, deleteUser)
// get a user 
router.get('/find/:id', findUser)

// as a user we can create posts 
router.get('/myposts', verifyToken, getMyPosts)
// as a user we can like posts 
router.get('/liked', verifyToken, getLikedPost)
// as a user we can bookmark posts 
router.get('/bookmarked', verifyToken, getBookmarkedPost)


export default router;