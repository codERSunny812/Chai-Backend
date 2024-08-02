import mongoose from 'mongoose'



const userSchema = new  mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required:[true,'password is required'],

    },
    fullName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    avtar: {
        type: String, //cloudinary image
        required: true 
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'videoModel'
        }
    ],
    refreshToken:{
        type:String
    }
},{
    timestamps:true
});



const userModel = mongoose.model('userModel',userSchema);