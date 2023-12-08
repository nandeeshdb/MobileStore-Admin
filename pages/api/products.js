import { moongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Product } from "@/lib/model/Product";


export default  async function handle(req,res){
    const {method} = req;
    await moongooseConnect()
    await isAdminRequest(req,res)
    
    //1-create new product
    if(method==='POST'){
        const {title,description,price,images,category,properties} = req.body
        const productDoc = await Product.create({title,description,price,images,category,properties})
        res.json(productDoc)

    }

    //2-sending specified product id
    if(method==='GET'){

        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
        }
        else{
            res.json(await Product.find())
        }
        
    }
    //3-updating the product

    if(method==='PUT'){
        const {title,description,price,images,category,properties,_id} = req.body
        await Product.updateOne({_id},{title,description,price,images,category,properties})
        res.json('Updated ')
        
    }
    
    //delete product
    if(method==='DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query.id})
            res.json('deleted')
        }
    }
}