import express  from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';



dotenv.config();

const router=express.Router();

const configuration=new Configuration({ // utilising our environment variable ie the openai api key 
    apiKey: process.env.OPENAI_API_KEY,
})

//creating an instance of openAI
const openai= new OpenAIApi(configuration)  // passing the configuration where we entered the api key


//adding the real daale route,which is going to make a call to openai dalle ap and based on our prompts it will return us a real ai generated image
router.route('/').get((req,res) => {
    res.send('joyooooo');
});

router.route('/').post( async (req, res) => {
    try {
        const {prompt} =req.body;

        const aiResponse = await openai.createImage({  // here we are getting the image
            prompt,
            n:1,
            size:'1024x1024',
            response_format: 'b64_json'
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image })  // sending the image to the front end
        } catch (error) {
          console.log(error);
          res.status(500).send(error?.response.data.error.message)
    }
})



export default router;

