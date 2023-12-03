
import mongoose, {Schema, model, models} from 'mongoose';

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
    images:[{type:String,required:true}],
    category:{type:mongoose.Types.ObjectId, ref:'Category'},
    properties:{type:Object}

})

const Product = models.product ||  model('product',ProductSchema)
export default Product;

