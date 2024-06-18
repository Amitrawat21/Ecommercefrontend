import React, { useEffect, useState } from 'react'
import "./popular.css"
// import   from "../Assest/data"
import axios  from 'axios'
import Item from '../item/Item'
const Popular = () => {
  const[data_product , set_data_product] = useState([])

  const getPopualarProduct = async()=>{
    const allPopularProduct =  await axios.get("https://ecommercebackend-11d1.onrender.com/popularinwomen")
    set_data_product(allPopularProduct.data.womenData)
  }

  useEffect(()=>{
  getPopualarProduct()
  } , [])
  
  return (
    <div className='popular'>
    <h1>POPULAR IN WOMEN</h1>
    <hr/>
    <div className='popular-item'>
        {data_product.map((item)=>{
             return <Item key = {item.id} id = {item.id} name= {item.name} image = {item.image} new_price = {item.new_price} old_price = {item.old_price}/>

        })}
    </div>

    </div>
  )
}

export default Popular
