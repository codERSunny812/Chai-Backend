import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },

}, { timestamps: true });

export const UserModel = mongoose.model('UserModel', userSchema);