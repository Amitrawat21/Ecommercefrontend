import React, { useState, useEffect, useContext } from 'react';
import './CSS/Order.css';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import empty from "../Components/Assest/empty.jpg";
import { TailSpin } from 'react-loader-spinner';

const Order = () => {
  const { userEmail } = useContext(ShopContext);
  const [allOrder, setAllOrder] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const orderCancel = async (id) => {
    try {
      const response = await axios.delete(`https://ecommercebackend-11d1.onrender.com/delete/${id}`);
      if (response.data.success) {
        setAllOrder((prevOrders) => prevOrders.filter((order) => order._id !== id));
        toast.success('Order cancelled successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://ecommercebackend-11d1.onrender.com/getAllOrder/${userEmail}`);
        if (response.data.success) {
          setAllOrder(response.data.orderData);
        } else {
          console.log('Data not found');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(()=>{
          setLoader(false);
          setShowContent(true);

        } , 1500)
       
      }
    };
    fetchOrder();
  }, [userEmail]);

  return (
    <div className="Checkout_container">
      {loader && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={40} width={40} />
        </div>
      )}
       
      {showContent && (
        <>
        <div className="allOrderProduct">
        <h2>My Orders</h2>
          {allOrder.length === 0 ? (
            <div>
              <p>No Orders Right Now</p>
              <img className='empty_image' src={empty} alt="No orders" />
            </div>
          ) : (
            allOrder.map((order) => (
              <div key={order._id} className="singleOrderProduct">
                <div className="uppar_wrapper">
                  <div className="uppar_wrapper_left">
                    <span style={{ color: 'black', fontWeight: '500' }}>Order Id </span>
                    <span style={{ color: 'blue', fontWeight: '500' }}>{order._id}</span>
                  </div>
                  <p className="trackorder">TRACK ORDER</p>
                </div>
                {order.orderList.map((product) => {
                  // Calculate the delivery date as four days after today
                  const today = new Date();
                  const deliveryDate = new Date(today);
                  deliveryDate.setDate(today.getDate() + 4);

                  return (
                    <div className="main" key={product._id}>
                      <div className="product_desc">
                        <div className="productdechLeft">
                          <div className="full_desc">
                            <img src={product.image} alt={product.name} />
                            <div className="details">
                              <div className="uppar_detail">
                                <h3>{product.name}</h3>
                                <p>{product.category}</p>
                              </div>
                              <div className="other_detail">
                                <h3>
                                  Qty <span>{product.quantity}</span>
                                </h3>
                                <p>
                                  $ <span>{product.totalPrice}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="productdechRight">
                          <p>Delivery expected</p>
                          <p>{deliveryDate.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
                <div className="lower">
                  <button onClick={() => orderCancel(order._id)}>Cancel Order</button>
                  <h3>Total Price: $ {order.orderList.reduce((acc, item) => acc + item.totalPrice, 0)}</h3>
                </div>
              </div>
            ))
          )}
        </div>
        </>
        
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Order;
