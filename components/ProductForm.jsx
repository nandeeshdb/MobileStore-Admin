import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images
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


    const uploadImages=async(e)=>{
      const files = e.target?.files
      if(files.length >0){
        const data = new FormData();
        for(const file of files){
          data.append('file',file)
        }
       const res = await axios.post('/api/upload',data)
       console.log(res.data)
      }
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

        <label>Photos</label>
        <div>
        <label 
          className='w-24 h-24 border-2 border-gray-400 flex flex-col items-center text-sm text-gray-400 justify-center hover:border-dotted hover:border-blue-900 hover:text-blue-900 hover:cursor-pointer' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
              Upload
          <input type='file'  className='hidden' onChange={uploadImages}/>
          </label>
          
          </div> 
       

        
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