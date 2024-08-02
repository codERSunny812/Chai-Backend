import mongoose from 'mongoose'

export  const connectDB = async()=>{
    try {
       await mongoose.connect("mongodb://127.0.0.1:27017/chaibackend")
        .then(()=>{
            console.log("mongoDB is connnected successfully");
        })
        .catch((error)=>{
console.log(`errror in connecting database ${error}`)
        })
    } catch (error) {
       console.log("error in connecting the DB")
        
    }
}