import Layout from '@/components/Layout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2';

export function Categories({swal}) {
    const[name,setName] = useState('')
    const[categories,setCategories] = useState([])
    const[parentCategory,setParentCategory] = useState('')
    const[editedCategory,setEditedCategory] = useState(null)
    const[properties,setProperties] = useState([])


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
        const data = {name,
          parentCategory,
          properties:properties.map(p=>({
            name:p.name,
            values:p.values.split(',')

        }))
        }
        if(editedCategory){
          await axios.put('/api/categories',{...data,_id:editedCategory._id})
          fetchCategory();
          setName('')
          setEditedCategory(null)
          setProperties([])
          setParentCategory('')
          
          
        }
        else{
          await axios.post('/api/categories',data)
          fetchCategory();
          setName('')
          setProperties([])
          setParentCategory('')
        }
    }

    const editCategory=(category)=>{
      setEditedCategory(category)
      setName(category.name)
      setParentCategory(category?.parent?._id)
      setProperties(category.properties.map(({name,values})=>({
        name,
        values:values.join(',')
    })))

    }

    const deleteCategory=(category)=>{
      swal.fire({
        title: 'Are you sure?',
        text: `Delete ${category.name} category`,
        showCancelButton:true,
        cancelButtonText:'Cancel',
        showConfirmButton:true,
        confirmButtonText:'Delete',
        confirmButtonColor:'#d55'

      
    }).then(async(result) => {
        
        //console.log({result})
        const confirm = result.isConfirmed;
        if(confirm ){
          const{_id} = category
          await axios.delete('/api/categories?_id='+_id)
          fetchCategory();
        }
    })
    }


    const addProperty=()=>{
      setProperties(prev=>{
        return [...prev,{name:'',values:''}]
      })

    }


    const handlePropertyNameChange = (index,property,newName)=>{
      // console.log({index,property,newName})

      setProperties(prev=>{
        const propertiess = [...prev]
        propertiess[index].name = newName;
        return propertiess
      })

    }
    const handlePropertyValueChange = (index,property,newValue)=>{
      // console.log({index,property,newValue})

      setProperties(prev=>{
        const propertiess = [...prev]
        propertiess[index].values = newValue;
        return propertiess
      })

    }

   const removeProperty=(index)=>{(
    setProperties(prev=>{
      return[...prev].filter((p,pIndex)=>{
        return pIndex !== index
      })
    })
    
    )

   }

    // console.log(properties)
  return (
    <Layout>
        <h1 className='font-bold mb-4'>Categories</h1>
        <label className='font-semibold '>{
          editedCategory ? `Edit Category ${editedCategory.name}` : ' Add New category '
        }</label>

        <form  onSubmit={saveCategory}>
          <div className="flex gap-2 my-3">
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
          </div>


          <div className='my-2'>
            <label className='block mb-4'>Properties</label>
            <button 
            className="btn-default text-sm " 
            type='button'
            onClick={addProperty}
            >
              Add new property
            </button>
            {
              properties.length>0 && properties.map((property,index)=>(
                <div className='flex gap-2 mt-4 items-center '>
                <input 
                type='text' 
                placeholder=' Name ' 
                className='mb-0'
                value={property.name}
                onChange={e=>handlePropertyNameChange(index,property,e.target.value)}
                />
                  <span>=</span>
                <input 
                type='text' 
                className='mb-0'
                placeholder='Values,with comma separated' 
                value={property.values}
                onChange={e=>handlePropertyValueChange(index,property,e.target.value)}
                />
                <button
                type='button'
                 className="btn-default" 
                onClick={()=>removeProperty(index)}>Remove</button>
                </div>

              ))
            }
          </div>

          <div className="flex gap-2 ">
          {
            editedCategory && (
              
                <button 
                className='btn-default my-3' 
                type='button'
                onClick={()=>{
                  setEditedCategory(null); 
                  setName(''); 
                  setParentCategory('')
                  setProperties([])
                }
                }
                >
                  Cancel</button>

             

            )
          }
        <button type='submit' className='btn-primary my-3 '>Save</button>
        </div>

        
           
        </form>

        {
          !editedCategory && (
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
                    <button 
                      className='btn-primary' 
                      onClick={()=>editCategory(category)}>
                        Edit</button>
                    <button 
                      className='btn-primary' 
                      onClick={()=>deleteCategory(category)}>
                        Delete</button>
                    
                  </td>
                </tr>
              ))
            }
            
          </tbody>
        </table>

          )
        }

    </Layout>
  )
}





export default withSwal(({swal},ref)=>(
  <Categories swal={swal}/>
))

