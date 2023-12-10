import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import commentRoutes from './routes/comment.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'



const app = express()
app.use(cors({origin:"http://localhost:5173", credentials:true}))
dotenv.config() 
app.use(express.json()) // for the app to parse json files 
app.use(cookieParser())

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    }catch(err){
        console.log(err)
    }
}

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

// error handling middleware 
app.use((err, req, res, next) => {
    const status = err.status || 500; 
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success : false, 
        status, 
        message
    })
})


app.listen(5000, ()=>{
    connectDB();
    console.log("server running on port 5000");
})