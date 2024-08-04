const mongoose = require('mongoose');
const  bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
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
        required: [true, 'password is required'],

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
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'videoModel'
        }
    ],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
}); 

//custom middle ware to hash the password 
userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10);
    next();
})

// custom function to check the   password 
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}


// function to generate the acess token 
userSchema.methods.generateAcessToken = function(){
return jwt.sign({
_id:this.id,
email:this.email,
fullName:this.fullName,
userName:this.userName
},
    process.env.ACESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACESS_TOKEN_EXPIRES_IN
}
)
}  //this function will give a unique token 


// function to generate refresh token 
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this.id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}


const userModel = mongoose.model('userModel',userSchema);