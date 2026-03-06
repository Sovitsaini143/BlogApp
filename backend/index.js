import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { v2 as cloudinary } from "cloudinary";
import fileUpload from 'express-fileupload';
import userRoute from './routes/user.route.js'
import blogRoute from './routes/blog.route.js'

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

//middleware

app.use(express.json());
app.use(cookieParser());

app.use( cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use( fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);



//routes defining
app.use("/api/users", userRoute)
app.use("/api/blogs", blogRoute)

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})