import { response } from "express";
import { asyncHandler } from "../utils/AsyncHanlder";
import { uploadOnCloudinary } from "../utils/Cloudinary";
import { upload } from "../middleware/multer.middleware";
import { User } from "../models/user.modal";
import { JsonWebTokenError } from "jsonwebtoken";



export const generateAcessTokenAndRefreshToken = async(userId)=>{
try {
    const user = await User.findById(userId);
    if(!user){
        throw new Error("no user found");

        const accessToken = user.generateAcessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken=refreshToken;

        await user.save({validateBeforeSave:true});



        return {accessToken , refreshToken};
    }
} catch (error) {
    
}
}


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


const logInUser  = asyncHandler(async(req,res)=>{

    // todo's
    // 1. collect the data 
    // 2. check the data
    // 3. find the user in the debugger
    // 4. check the password
    // 5. acess token and refresh token
    // 6. send the cookies 

    const {userName , email  , password} = req.body;

    if(!userName || !email ) {
        return res.status(400).json({
            message:"user name or email is required"
        })
    }


    const user = await User.findOne({
        $or:[{ username } , { email }]
    });


    if(!user){
        throw new Error("use not found");
    }

    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) {
        throw new Error("password incorrect");
    }

    //generate the access token 
    const {accessToken , refreshToken } = generateAcessTokenAndRefreshToken(user._id);


    // check for the loggedIn user 
    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");


    // sendig the cookies
    const options = {
        httpOnly:true,
        secure:true
    }


    res.status(201)
    .cookies("acessToken",accessToken,options)
    .cookies("refreshToken",refreshToken,options)
    .json({
        user:{loggedInUser,accessToken,refreshToken},
        message:"user loggedIn successfully"

    })


})




const logOutUser = async(req,res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },{
            new:true
        }
    )

    // clearing the cookies 

    const options = {
        httpOnly:true,
        secure:true
    }


    return res.status(201)
    .clearCookies("acessToken",options)
    .clearCookies("refreshToken",options)
    .json({
        message:"user logout successfully"
    })
} 



const RefreshAcessToken = async(req,res)=>{

    //taking the token from the req

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
     throw new Error('unauthorized request');
    }


    const decodedToken = Jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_KEY
    )

    const user = await User.findById(decodedToken._id);

    if(!user){
        throw new Error("invalid refresh token");
    }



    if(incomingRefreshToken !== user.refreshToken){
        throw new Error("refresh token expires");
    }

    //generate new token 

    const {accessToken , newRefreshToken } = generateAcessTokenAndRefreshToken(user._id);


    return res.status(200)
    .cookie('acessToken',accessToken)
    .cookie('refreshToken',newRefreshToken)
    .json({
        message:"new access token generated",
        data:{accessToken,newRefreshToken}
    })

}


export { registerUser , logInUser , logOutUser}