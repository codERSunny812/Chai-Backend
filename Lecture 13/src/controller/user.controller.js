import { response } from "express";
import { asyncHandler } from "../utils/AsyncHanlder";
import { uploadOnCloudinary } from "../utils/Cloudinary";
import { upload } from "../middleware/multer.middleware";
import { User } from "../models/user.modal";


const registerUser = asyncHandler(async(req,res)=>{
    //get the user from the front end 
    //validation of the data from the front end 
    //check if the user is already exist: userName or email
    //check for the files 
    //upload them to the cloudinary , avtar
    //create the object of  the user - create in the DB
    //remove the password and refresh token from the response
    //check for the user creation 
    // return the response

    const {userName , fullName , password , email } = req.body;

    // validate the user data
    if([userName, fullName , password , email].some((field) => field.trim() === " ")){
        return res.status(400).json({msg:"Please fill in all fields"});
    } 

    // check for the user existance 
    const userExist = await User.findOne({$or: [{ userName },{ email }]});


    if(userExist){
        throw new Error("User already exist");
    }


    // check for the images 

    const avtarLocalFilePath = req.files.avtar[0].path;

    const coverImageLocalFilePath = req.files.coverImage;

    // now check for the avtart file 

    if(!avtarLocalFilePath){
        throw new Error("avtar image is neccary")
    }


    // upload the image on the cloudinary 
    const avtarImage = await uploadOnCloudinary(avtarLocalFilePath);

    const coverImage = await uploadOnCloudinary(coverImageLocalFilePath);

    // check for the avtart again 
    if(!avtarImage){
        throw new Error("avtar image is neccary")
    }



    // create the user on the DB

    const newUser = await User.create({
        fullName,
        userName,
        avtar:avtarImage.url,
        coverImage:coverImage.url || " ",
        password
    })

    const createdUser = User.findById(newUser._id).select(
        " -password -refreshToken "
    );


    // check that user is created in the DB or not 

    if(!createdUser){
        throw new Error("user cant created in registration")
    }




    return res.status(200).json({
        message:"user created successfully",
        user:createdUser
        
    })





})


export default registerUser