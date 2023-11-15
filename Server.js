import 'express-async-errors';
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan';
const app = express();        
// import router from './Routes/Jobroutes.js'
import router from './Routes/Jobroutes.js';
 
import mongoose from 'mongoose';
import authrouter from './Routes/Authroutes.js'
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

//middleware
import Errorhandlemiddleware from './middleware/Errorhandle.js';
import { Authmiddle } from './middleware/Authmiddleware.js';
import userRoutes from './Routes/UserRoutes.js'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
const __dirname = dirname(fileURLToPath(import.meta.url));



// fetch(
//     'https://www.course-api.com/react-useReducer-cart-project')
//     .then((res)=>res.json())
//   .then((data)=>console.log(data));    

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './Public')));
app.use(cookieParser())                                
app.use(express.json())


app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });


app.use('/api/v1/jobs/',Authmiddle,router)
app.use('/api/v1/users',Authmiddle,userRoutes)
app.use('/api/v1/auth',authrouter)
             
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./Public','index.html'))
})

app.get('/',(req,res)=>{                    
    res.send('server is running on port...');
})

    app.use('*',(req,res)=>{
        res.status(404).json({msg:"something went wrong"})
    })


    app.use(Errorhandlemiddleware);

    const port = process.env.PORT || 5100
     try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`server is running on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }




