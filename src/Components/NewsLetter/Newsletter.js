
import React from 'react'
import "./Newsletter.css"

const Newsletter = () => {
  return (
    <div className='newsletter'>
        <h1>GET Exclusive OFFER ON YOUR EMIAL</h1>
        <p>sunscribe to out newsletter and stay update</p>
        <div>
            <input type='email' placeholder='your email id'/>

            <button>subscribe</button>
        </div>
      
    </div>
  )
}

export default Newsletter
