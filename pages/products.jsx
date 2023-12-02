import Layout from '@/components/Layout'
import React from 'react'
import Link from 'next/link'

function Products() {
  return (
    <Layout> 
      <Link href={'/products/new'}
      className='bg-blue-900 text-white p-2 rounded-md'>
        Add new product
      </Link>
    </Layout>
  )
}

export default Products