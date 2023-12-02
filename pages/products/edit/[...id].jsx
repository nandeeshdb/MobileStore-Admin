import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';


function EditProductPage() {
  const router = useRouter();
  const{id} = router.query;
  const[productData,setProductData]= useState(null)
  

  useEffect(()=>{

    axios.get('/api/products?id='+id).then(response=>{
      setProductData(response.data)
      
    })

  },[id])
  return (
    <Layout> 
      <h1 className='ml-2 font-semibold'>Edit  Product</h1>
      {
        productData&&(
          <ProductForm  {...productData}/>
        )
      }
  
    </Layout>
  )
}

export default EditProductPage