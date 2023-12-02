import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

function NewProducts() {
    const[title,setTitle] =useState('')
    const[description,setDescription] = useState('')
    const[price, setPrice] = useState('')
    const[goToProductPage,setGoToProductPage] = useState(false)
    const router = useRouter()

    const createProduct=async(e)=>{
        e.preventDefault()
        const data = {title,description,price}
        await axios.post('/api/products',data)
        setGoToProductPage(true)

    }
    if(goToProductPage){
      router.push('/products')
    }
  return (
    <Layout>
        <form onSubmit={createProduct}>
        <div className='flex flex-col gap-2 '>
        <h1 className='ml-2 font-semibold'>New Product</h1>

        
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
    </Layout>
  )
}

export default NewProducts