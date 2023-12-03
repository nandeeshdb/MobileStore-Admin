import Layout from '@/components/Layout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Categories() {
    const[name,setName] = useState('')
    const[categories,setCategories] = useState([])


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
        await axios.post('/api/categories',{name})
        fetchCategory();
        setName('')

    }
  return (
    <Layout>
        <h1 className='font-bold mb-4'>Categories</h1>
        <label className='font-semibold '> New category name</label>
        <form className='flex gap-2 my-3' onSubmit={saveCategory}>
            <input 
            placeholder='category name'
            className='my-0'
            value={name}
            onChange={e=>setName(e.target.value)}
            />
            <button type='submit' className='btn-primary'>Save</button>
        </form>

        <table className='basic'>
          <thead>
            <tr>
              <td>Category Name</td>
            </tr>
          </thead>
          <tbody>
            {
              categories.length>0 && categories.map(category=>(
                <tr key={category._id}>
                  <td>{category.name}</td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
    </Layout>
  )
}

export default Categories