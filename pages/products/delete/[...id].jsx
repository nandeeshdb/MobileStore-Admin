import Layout from "@/components/Layout";
import axios from "axios";
import {useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct(){
    const router = useRouter();
    const{id} = router.query;
    const[productInfo,setProductInfo] = useState()
   useEffect(()=>{
    if(id){

        axios.get('/api/products?id='+id).then(response=>{
            setProductInfo(response.data)

        })

    }
   },[id])



   function goBack(){
    router.push('/products')
   }

   const deleteProduct = async()=>{
    axios.delete('/api/products?id='+id)
    router.push('/products')

   }
    return(
        <Layout>
            <div className="mt-52">
           <h1 className="text-center my-6"> Do you want to delete "{productInfo?.title}"?</h1>
           
           <div className="flex gap-3 justify-center ">
            <button 
            className="btn-red"
            onClick={deleteProduct}>Yes
            </button>

            <button 
            onClick={goBack} 
            className="btn-default">No</button>
            clear
            </div>
            </div>
        </Layout>
    )
}