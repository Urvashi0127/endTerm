import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser" 
import usersRoute from "./routes/users.js"

const app = express()

dotenv.config();

const connect = async()=>{

    try{
    mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    }catch (error)
    {
        throw(error);
    };
}


mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected")
})


app.get("/",(req,res)=>
{
    res.send("Hello");
})

//middlewares

app.use(cookieParser());

// app.use((req,res,next)=>{

//     console.log("Hi this is first middleware")
//     next()
// })


app.use(express.json()) // necessary to post json from Insomnia

// use expres.json before the following syntax
app.use("/api/auth",authRoute);

app.use("/api/hotels",hotelRoute);

app.use("/api/users",usersRoute);

app.use("/api/rooms",roomsRoute);


app.use((err,req,res,next)=>
{   
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(500).json(err)  // Customized err
})


app.listen(8800,()=>{

    connect(); 
    console.log("Server started at port : 8800")
})





