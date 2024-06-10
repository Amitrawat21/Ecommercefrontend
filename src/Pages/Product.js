import React, { useContext  , useEffect} from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Components/Bredcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RealtedProduct from '../Components/RelatedProduct/RealtedProduct'
const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams();

  const product = all_product?.find((e)=>e.id=== parseInt(productId))



  return (
    <div>
      <Breadcrums product = {product}/>
      <ProductDisplay product = {product}/>
      <DescriptionBox/>
      <RealtedProduct product = {product}/>
      
    </div>
  )
}

export default Product
