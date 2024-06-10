
import React from 'react'
import "./Offer.css"
import exclusive_image  from '../Assest/exclusive_image.png'

const Offer = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Exclusive</h1>
            <h1>Offers</h1>
            <p>only on best sellers products</p>
            <button>check now</button>
        </div>
        <div className='offers-right'>
        <img src= {exclusive_image} alt = ""/>

        </div>
       

      
    </div>
  )
}

export default Offer
