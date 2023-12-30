import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName:{
        required:true,
        unique: true,
        type: String,
    },
    userEmail: {
        required: true,
        unique: true,
        type: String,
    },
    userPassword: {
        required: true,
        unique: true,
        type: String,
    }

},
{
timestamps:true
})


export const user = mongoose.Model("User",userSchema)