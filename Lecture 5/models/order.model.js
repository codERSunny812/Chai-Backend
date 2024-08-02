import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({ 
    productName:{
        type:String,
        required:true,

    },
    productPrice:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        },
});


const orderModel = mongoose.model('orderModel',orderSchema);