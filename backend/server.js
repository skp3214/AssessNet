import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv";
import connectToMongo from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app=express();

const allowedOrigins = ['https://assessnet.vercel.app', '*']; 
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization,authtoken',
    optionsSuccessStatus: 204
}));

const PORT=process.env.PORT||5000;

app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectToMongo();
})