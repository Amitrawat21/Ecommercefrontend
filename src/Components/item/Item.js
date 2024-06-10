
import React from 'react'
import "./item.css"
import { Link } from 'react-router-dom'



const Item = (props) => {


  const handleClick = () => {
    if (props.scrollToTop==false) {
      if(localStorage.getItem('auth'))
      window.scrollTo(0, 0); // Scroll to top only if scrollToTop prop is false
    }

    else{
      window.scrollTo(0, 0)

    }
    // Any other click behavior
  }

  
  return (
    <div className='item'>
       <Link to = {`/product/${props.id}`}>  <img onClick={handleClick} src = {props.image} alt=''/></Link>
        <p>{props.name}</p>
        <div className='item-prices'>
            <div className='item-price-new'>
                ${props.new_price}
            </div>
            <div className='item-price-old'>
                ${props.old_price}
            </div>
        </div>
      
    </div>
  )
}

export default Item
