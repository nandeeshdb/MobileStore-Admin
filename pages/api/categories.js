import { moongooseConnect } from "@/lib/mongoose";

const { default: Category } = require("@/lib/model/Categories");

const handle = async(req,res)=>{
    const {method} = req;
    moongooseConnect();

    if(method==='POST'){
        const {name,parentCategory} = req.body;
        const categoryDoc = await Category.create({
            name,
            parent:parentCategory
        })
        res.json(categoryDoc)
    }

    if(method === "GET"){
        res.json(await Category.find().populate('parent'))

    }

}


export default handle