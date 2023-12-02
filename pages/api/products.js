import Product from "@/lib/model/Product";
import { moongooseConnect } from "@/lib/mongoose";


export default  async function handle(req,res){
    const {method} = req;
    await moongooseConnect()
    
    //1-create new product
    if(method==='POST'){
        const {title,description,price} = req.body
        const productDoc = await Product.create({title,description,price})
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
        const {title,description,price,_id} = req.body
        await Product.updateOne({_id},{title,description,price})
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