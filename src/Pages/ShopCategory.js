import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assest/dropdown_icon.png';
import Item from '../Components/item/Item';
import Footer from '../Components/Footer/Footer';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectoption, setSelectOption] = useState('');
  const [shouldScrollToTop, setShouldScrollToTop] = useState(true);
  const[searchProduct , setSearchProduct]  =  useState('')

  useEffect(() => {
    const filtered = all_product.filter(item => item.category === props.category);
    setFilteredProducts(filtered);
 
  
  }, [all_product, props.category ]);


  useEffect(() => {
    if (selectoption === "minprice") {
      const sortedProducts = [...filteredProducts].sort((a, b) => a.new_price - b.new_price);
      
      setFilteredProducts(sortedProducts);
    }
    else if(selectoption === "maxprice"){
      const sortedProducts = [...filteredProducts].sort((a, b) => b.new_price - a.new_price);
      setFilteredProducts(sortedProducts);
       
    }
    setShouldScrollToTop(false);
  }, [selectoption]);


  
  const changehandler = (e) => {
    setSelectOption(e.target.value);
  };





  const searchHandle = (e) => {
    const searchTerm = e.target.value;
    setSearchProduct(searchTerm);
  
    // If the search term is empty, show all products from the current category
    if (searchTerm === "") {
      const filtered = all_product.filter(item => item.category === props.category);
      setFilteredProducts(filtered);
    } else {
      // Filter products based on both category and search term
      const newFilteredProducts = all_product.filter((item) => {
        return item.category === props.category && item.name.includes(searchTerm);
      });
      setFilteredProducts(newFilteredProducts);
    }
  };
  

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="category-banner" />
      <div className='shopcategory-indexsSort'>
        <div className='shopcategory-search'>
          <input type='text' placeholder='search product' style={{border : "none" , padding : "7px"}} onChange={searchHandle}/>
        </div>

        <div className='shopcategory-sort'>
          <select style={{ border: "none", fontSize: "15px" }} onChange={changehandler}>
            <option value= ''>select</option>
            <option value="minprice">min price to max price</option>
            <option value="maxprice">max price to min price</option>
          </select>
        </div>
      </div>
      <div className='shopcategory-products'>
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            scrollToTop={shouldScrollToTop}
          />
        ))}
      </div>

      <div className='shopcategory-loadmore'>
        Explore more
      </div>
    </div>
  );
};

export default ShopCategory;
