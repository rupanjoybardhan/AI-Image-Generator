import express  from "express";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router=express.Router();

cloudinary.config({  // Configuring cloudinary to upload our images there
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS
router.route('/').get(async(req,res) => {
    try {
         const posts = await Post.find({});

         res.status(200).json({ success:true ,data:posts})
    } catch (error) {
         res.status(500).json({ success:false, message:error})
    }
});

//CREATE A POST
router.route('/').post(async(req,res) => {
    try {
        const { name, prompt ,photo } = req.body;  //we're sending this data from the front end
    const photoUrl = await cloudinary.uploader.upload(photo); //uploading the photourl to the cloudinary,the photo is passed from the front end ,we upload it to cloudinary and then we get the cloudinary optimized url
    const newPost= await Post.create({   //this is going to create a newpost in our database
        name,
        prompt,
        photo: photoUrl.url,
    })

    res.status(201).json({ success:true,data: newPost});
    } catch (error) {
        res.status(500).json({ success:false, message:error })
    }
})

export default router;

// implementing almost crud like functionality

//cloudinary - it is going to host our images for us so we can retrieve them later on once we submit them and make our application so much faster