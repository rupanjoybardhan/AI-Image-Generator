import mongoose from "mongoose";

//creating our new post schema
const Post = new mongoose.Schema({
    name:{type: String,required:true},
    prompt:{type: String,required:true},
    photo:{type: String,required:true},

});

// creating a model of that schema
const PostSchema= mongoose.model('Post',Post);  // the first post in parenthesis is the name of the model and second post is passing the schema called post that we created

export default PostSchema;

// we can use it when generating new post