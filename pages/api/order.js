import { Order } from "@/lib/model/Order";
import { moongooseConnect } from "@/lib/mongoose";

export default async function handler(req,res){
    await moongooseConnect();
    res.json(await Order.find().sort({createdAt:-1}))
}