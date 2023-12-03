import Categories from '@/pages/categories';
import { withSwal } from 'react-sweetalert2';
export default withSwal(({swal},ref)=>(
    <Categories swal={swal}/>
))