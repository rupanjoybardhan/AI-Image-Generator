import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';



dotenv.config(); // this line allows us to pool our env variables from our dotenv file which we will create soon

const app = express();



//adding additional middlewares
app.use(cors());
app.use(express.json({ limit : '50mb'}));
app.use(express.urlencoded({extended: true}))
// below we have created API endpoints that we can connect or hook onto from our frontend side
app.use('/api/v1/post', postRoutes); 
app.use('/api/v1/dalle', dalleRoutes);

app.get("/",async (req,res) => {   //route to url of the server
    res.send("hello from dalle");
} )


const startServer= async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,() => {
                    console.log('server is running at port')})
    }catch(error){
        console.log(error);
    }
    
};
startServer();

