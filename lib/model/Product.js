const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },

})

const Product = models.productData ||  model('productData',ProductSchema)
export default Product;

