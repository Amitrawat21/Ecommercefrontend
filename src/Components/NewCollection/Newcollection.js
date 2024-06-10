import React , {useEffect, useState} from 'react'

import  "./Newcollection.css"

import Item from '../item/Item'
import axios from 'axios'
const Newcollection = () => {

  const[new_collection, set_new_collection] = useState([])

  const getNewCollection = async()=>{
    const res = await axios.get("https://ecommercebackend-1-02g7.onrender.com/getNewCollection")
    set_new_collection(res.data.alldata)
    
  }


  useEffect(()=>{
    getNewCollection()
  } , [])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTION</h1>
        <hr/>
        <div className='collections'>
            {new_collection.map((item , index)=>{
                return <Item key = {item.id} id = {item.id} name= {item.name} image = {item.image} new_price = {item.new_price} old_price = {item.old_price}/>

            })}

        </div>
      
    </div>
  )
}

export default Newcollection
