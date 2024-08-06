const mongoose = require('mongoose')
const {v2  } = require('cloudinary');
const fs = require('fs')


const uploadPost =async (filePath)=>{

    try {
        if(!filePath) return null;

        //upload the file on the cloudinary 
        const result = await v2.uploader.upload(filePath,{resource_type:"auto"});

        return result;
    } catch (error) {
        //remove the file from the server 
        fs.unlinkSync(filePath); 
    }

}


export default uploadPost;