import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"


function NewProducts() {
  return (
    <Layout>
      <h1 className='ml-2 font-semibold'>New Product</h1>
    <ProductForm />
    </Layout>
  )
    
}

export default NewProducts