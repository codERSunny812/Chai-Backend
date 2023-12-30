import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
description:{
    type:String,
    required:[true,'Please add a description'],
},
name:{
type:String,
required:[true,"Why no name?"]
},
productImage:{
    type:String
},
priceOfProduct:{
    type:Number,
    default:0,
},
stock:{
    type:Number,
    default:0
},
category:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"category"
},
userData:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
}
},{
    timestamps:true
})


export const product = mongoose.Model("Product",productSchema)