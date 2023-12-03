import Layout from '@/components/Layout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Categories() {
    const[name,setName] = useState('')
    const[categories,setCategories] = useState([])
    const[parentCategory,setParentCategory] = useState('')
    const[editedCategory,setEditedCategory] = useState(null)


    useEffect(()=>{
      fetchCategory()
    },[])


    const fetchCategory = ()=>{
      axios.get('/api/categories').then(response=>{
        setCategories(response.data)
      })
    }

    const saveCategory=async(e)=>{
        e.preventDefault();
        const data = {name,parentCategory}
        if(editedCategory){
          await axios.put('/api/categories',{...data,_id:editedCategory._id})
          fetchCategory();
          setName('')
          setEditedCategory(null)
        }
        else{
          await axios.post('/api/categories',data)
          fetchCategory();
          setName('')
        }
    }

    const editCategory=(category)=>{
      setEditedCategory(category)
      setName(category.name)
      setParentCategory(category?.parent?._id)

    }
  return (
    <Layout>
        <h1 className='font-bold mb-4'>Categories</h1>
        <label className='font-semibold '>{
          editedCategory ? `Edit Category ${editedCategory.name}` : ' Add New category '
        }</label>

        <form className='flex gap-2 my-3' onSubmit={saveCategory}>
            <input 
            placeholder='category name'
            className='my-0'
            value={name}
            onChange={e=>setName(e.target.value)}
            />
           <select className='my-0 max-sm:w-20 bg-white' 
            onChange={e=>setParentCategory(e.target.value)}
            value={parentCategory}>
            <option value="">No parent Category</option>
            {
              categories.length > 0 && categories.map(category=>(
                <option  key={category._id} value={category._id}>{category.name}</option>
              ))
            }
          </select>
            <button type='submit' className='btn-primary'>Save</button>
        </form>


        <table className='basic'>
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
            </tr>
          </thead>
          <tbody>
            {
              categories.length>0 && categories.map(category=>(
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td className='flex gap-2'>
                    <button className='btn-primary' onClick={()=>editCategory(category)}>Edit</button>
                    <button className='btn-primary'>Delete</button>
                    
                  </td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
    </Layout>
  )
}

export default Categories