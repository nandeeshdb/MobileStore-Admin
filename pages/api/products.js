import Product from "@/lib/model/Product";
import { moongooseConnect } from "@/lib/mongoose";


export default  async function handle(req,res){
    const {method} = req;
    await moongooseConnect()
    
    if(method==='POST'){
        const {title,description,price} = req.body
        const productDoc = await Product.create({title,description,price})
        res.json(productDoc)

    }

    if(method==='GET'){
        res.json(await Product.find())
    }
}