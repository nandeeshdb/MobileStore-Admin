import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function OrdersPage() {
  const[orders,setOrders] = useState([])
  

  useEffect(()=>{
    axios.get('/api/order').then(response=>{
      setOrders(response.data);
    })
    

  },[])

  return (
    <Layout>
      <h1>Orders</h1>
      <table className='basic'>
        <thead>
          <tr>
            <td>Date</td>
            <td>Recipient</td>
            <td>Products</td>
          </tr>
        </thead>
        <tbody>
          {
            orders.length > 0 && orders.map((order)=>(
              <tr>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td>{order.name} {order.email} <br/>
                    {order.address} {order.city} <br />
                    {order.country} {order.pincode} <br />
                </td>
                <td>
                  {order.line_items.map((l)=>(
                    <tr> 
                    <td>Name : {l.price_data.product_data.name} </td>
                    <td>Quantity : {l.quantity}</td>
                    </tr>
                  ))}
                </td>

                
              </tr>
            ))
          }
        </tbody>

      </table>



    </Layout>
  )
}

export default OrdersPage