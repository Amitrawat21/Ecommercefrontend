import React , {useContext , useEffect , useState} from 'react'
import "./RelatedProduct.css"
import data_product from '../Assest/data'
import Item from '../item/Item'
import { ShopContext } from '../../Context/ShopContext'
const RealtedProduct = (props) => {
  const { all_product } = useContext(ShopContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const filtered = all_product.filter(item => item.category === props?.product?.category);
    setFilteredProducts(filtered);
 
  
  }, [all_product, props.category ]);



  return (
    <div className='realtedproducts'>
        <h1>Related products</h1>
        <hr/>
        <div className='relatedproducts-item'>
            {filteredProducts && filteredProducts.map((item , i)=>{
                 return <Item key = {item.id} id = {item.id} name= {item.name} image = {item.image} new_price = {item.new_price} old_price = {item.old_price}/>
            })}

        </div>
      
    </div>
  )
}

export default RealtedProduct
