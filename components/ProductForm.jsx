import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice
}) {
    const[title,setTitle] =useState(existingTitle||'')
    const[description,setDescription] = useState(existingDescription||'')
    const[price, setPrice] = useState(existingPrice||'')
    const[goToProductPage,setGoToProductPage] = useState(false)
    const router = useRouter()

    const creatingOrUpdatingProduct=async(e)=>{
        e.preventDefault()
        const data = {title,description,price}
       if(_id){
            //updating the data
        await axios.put('/api/products',{...data,_id})
        
       }
       else{
        //creating a new data
        await axios.post('/api/products',data)
       }
       setGoToProductPage(true)

    }
    if(goToProductPage){
      router.push('/products')
    }
  return (
    
        <form onSubmit={creatingOrUpdatingProduct}>
        <div className='flex flex-col gap-2 '>
        

        
        <label>Product Name</label>
        <input type='text' 
        placeholder='product name' 
        className='sm:max-w-xl '
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
       

        
        <label>Product Description</label>
        <textarea  
        placeholder='description' 
        className='h-36  sm:max-w-xl '
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        

       
        <label>Product Price</label>
        <input type='text' 
        placeholder='price' 
        className='sm:max-w-xl '
        value={price}
        onChange={(e)=>setPrice(e.target.value)}/>

        <button type='submit' className='btn-primary sm:max-w-xl'>Save</button>
        

        </div>
        </form>
    
  )
}

export default ProductForm