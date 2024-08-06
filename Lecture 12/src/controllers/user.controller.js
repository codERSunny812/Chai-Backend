import { asyncHandler } from "../utils/user";



const registerUser = asyncHandler(async(req,res)=>{
res.status(200).json({
    message:"ok"
})
});