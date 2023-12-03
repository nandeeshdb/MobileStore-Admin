import { moongooseConnect } from "@/lib/mongoose";

const { default: Category } = require("@/lib/model/Categories");

const handle = async(req,res)=>{
    const {method} = req;
    moongooseConnect();

    if(method==='POST'){
        const {name} = req.body;
        const categoryDoc = await Category.create({name})
        res.json(categoryDoc)
    }

    if(method === "GET"){
        res.json(await Category.find())

    }

}


export default handle