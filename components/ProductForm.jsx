import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import {ReactSortable} from 'react-sortablejs'
import { set } from 'mongoose'

function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
    category:existingCategory
}) {
    const[title,setTitle] =useState(existingTitle||'')
    const[images,setImages] = useState(existingImages || [])
    const[description,setDescription] = useState(existingDescription||'')
    const[price, setPrice] = useState(existingPrice||'')
    const[goToProductPage,setGoToProductPage] = useState(false)
    const[isUploading,setIsUploading] = useState(false)
    const[categogries,setCategories] = useState([])
    const[category,setCategory] = useState(existingCategory||'')
    const router = useRouter()


    useEffect(()=>{
      axios.get('/api/categories').then(response=>{
        setCategories(response.data)
      })
    })


    const creatingOrUpdatingProduct=async(e)=>{
        e.preventDefault()
        const data = {title,description,price,images,category}
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
      setIsUploading(true)
      const files = e.target?.files
      if(files.length >0){
        const data = new FormData();
        for(const file of files){
          data.append('file',file)
        }
       const res = await axios.post('/api/upload',data)
       setImages(oldImages=>{
          return[...oldImages,...res.data.links]
       })
      }
      setIsUploading(false)
    }


    const uploadImageOrder =(image)=>{
      setImages(image)
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


        <label>Category</label>
        <select className='sm:max-w-xl' value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {
            categogries.length > 0 && categogries.map(c=>(
              <option value={c._id}>{c.name}</option>
            ))
          }
        </select>


      <label>Photos</label>
      <div className='flex flex-wrap gap-2'>
      <ReactSortable className='flex flex-wrap gap-2' list={images} setList={uploadImageOrder}>
       
        {!!images?.length && images.map(link=>(
           
          <div key={link}  className='border-2  border-gray-300'>

            <img src={link} alt='no' className='w-24 h-24 rounded-lg'/>
          </div>
          
        ))
        }
        </ReactSortable>
        
        

      {isUploading && (
            <div className='p-1 h-24 w-24 border-2 border-gray-400 flex items-center'>
              <Spinner />
            </div>
          )}

        
        <div>
         
        <label 
          className='w-24 h-24 border-2 border-gray-400 flex flex-col items-center text-sm text-gray-400 justify-center hover:border-dotted hover:border-blue-900 hover:text-blue-900 hover:cursor-pointer' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
              Upload
          <input type='file'  className='hidden' onChange={uploadImages} />
          </label>
          
          </div> 
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