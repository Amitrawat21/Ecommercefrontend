
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import men_banner from "./Components/Assest/banner_mens.png"
import women_banner from "./Components/Assest/banner_women.png"
import kids_banner from "./Components/Assest/banner_kids.png"
import Footer from './Components/Footer/Footer';
import Order from './Pages/Order';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Shop/>}/>
        <Route path='/mens' element = {<ShopCategory banner = {men_banner} category = "men"/>}/>
        <Route path='/womens' element = {<ShopCategory banner = {women_banner} category = "women"/>}/>
        <Route path='/kids' element = {<ShopCategory banner = {kids_banner} category = "kid"/>}/>
        <Route path='/product/:productId' element = {<Product/>}/>
        <Route path='/orders' element = {<Order/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/login' element = {<Login/>}/>
        
      </Routes>
      <Footer/>
      
      </BrowserRouter>
     
 
    </div>
  );
}

export default App;
