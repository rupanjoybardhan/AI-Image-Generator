/*import mongoose from "mongoose";


const connectDB =(url) => {
    mongoose.set('strictQuery',true);  // useful when working with search functionality

    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));
}

export default connectDB;*/

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log('connected to mongo'))
    .catch((err) => {
      console.error('failed to connect with mongo');
      console.error(err);
    });
};

//{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}

export default connectDB;