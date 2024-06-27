import express, { Application,Request,Response,NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config()
import ErrorHandler from './utils/error-handler';
import dbConfig from "./configs/db-config";
import cookieParser from 'cookie-parser';
import cors from "cors";
import mongoose from "mongoose";

const PORT:Number = Number(process.env.PORT || 3031)
dbConfig
process.env.TZ = 'Asia/Kolkata';

// Application
const app:Application = express()

app.use(cookieParser());
app.use(express.json())

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);


const corsHeadersForStaticFiles = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  next();
};

// Apply the custom middleware to the route serving static files
app.use('/public', corsHeadersForStaticFiles, express.static('public'));

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
  }

//Main Route
import mainRoute from './routes/index';
import errorMiddleware from "./middlewares/error-middleware";
app.use('/api/v1',mainRoute);

// Not Found Middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    return next(ErrorHandler.notFound())
})

// Error Middleware
app.use(errorMiddleware);

//Listning Server
app.listen(PORT,()=>console.log(`SERVER IS LISTING ON ${PORT}`))