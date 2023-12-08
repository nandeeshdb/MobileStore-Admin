const { Schema, models, model } = require("mongoose");

const OrderSchem = new Schema({
    line_items:Object,
    name:String,
    email:String,
    address:String,
    city:String,
    pincode:String,
    country:String,
    paid:Boolean
},{timestamps:true},)

export const Order = models?.Order || model('Order',OrderSchem)